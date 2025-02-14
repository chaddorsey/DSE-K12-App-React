import { ConnectionService } from '../ConnectionService';
import { db } from '@/config/firebase';
import type { Connection } from '../../types';

jest.mock('@/config/firebase');

describe('ConnectionService', () => {
  let service: ConnectionService;

  beforeEach(() => {
    service = new ConnectionService();
  });

  describe('requestConnection', () => {
    it('should create a pending connection request', async () => {
      const connection = await service.requestConnection('user1', 'user2');
      
      expect(connection).toMatchObject({
        users: ['user1', 'user2'],
        status: 'pending',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
      });
    });

    it('should prevent duplicate connection requests', async () => {
      await service.requestConnection('user1', 'user2');
      await expect(
        service.requestConnection('user1', 'user2')
      ).rejects.toThrow('Connection already exists');
    });

    it('should prevent self-connections', async () => {
      await expect(
        service.requestConnection('user1', 'user1')
      ).rejects.toThrow('Cannot connect with self');
    });

    it('should handle reverse duplicate requests', async () => {
      await service.requestConnection('user1', 'user2');
      await expect(
        service.requestConnection('user2', 'user1')
      ).rejects.toThrow('Connection already exists');
    });
  });

  describe('acceptConnection', () => {
    it('should update connection status to accepted', async () => {
      const connection = await service.requestConnection('user1', 'user2');
      const accepted = await service.acceptConnection(connection.id, 'user2');
      
      expect(accepted.status).toBe('accepted');
      expect(accepted.updatedAt).not.toEqual(connection.updatedAt);
    });

    it('should only allow target user to accept', async () => {
      const connection = await service.requestConnection('user1', 'user2');
      await expect(
        service.acceptConnection(connection.id, 'user3')
      ).rejects.toThrow('Not authorized to accept this connection');
    });

    it('should not allow accepting non-pending connections', async () => {
      const connection = await service.requestConnection('user1', 'user2');
      await service.acceptConnection(connection.id, 'user2');
      
      await expect(
        service.acceptConnection(connection.id, 'user2')
      ).rejects.toThrow('Connection is not pending');
    });

    it('should not allow accepting non-existent connections', async () => {
      await expect(
        service.acceptConnection('fake-id', 'user2')
      ).rejects.toThrow('Connection not found');
    });
  });

  describe('getConnections', () => {
    beforeEach(async () => {
      // Set up test connections
      await service.requestConnection('user1', 'user2');
      const conn = await service.requestConnection('user3', 'user1');
      await service.acceptConnection(conn.id, 'user1');
    });

    it('should return user connections by status', async () => {
      const pending = await service.getConnections('user1', 'pending');
      const accepted = await service.getConnections('user1', 'accepted');
      
      expect(pending).toHaveLength(1);
      expect(accepted).toHaveLength(1);
    });

    it('should return all user connections when no status specified', async () => {
      const all = await service.getConnections('user1');
      expect(all).toHaveLength(2);
    });

    it('should include both initiated and received connections', async () => {
      const connections = await service.getConnections('user1');
      expect(connections.some(c => c.users[0] === 'user1')).toBe(true);
      expect(connections.some(c => c.users[1] === 'user1')).toBe(true);
    });
  });

  describe('checkConnection', () => {
    it('should verify active connection between users', async () => {
      const connection = await service.requestConnection('user1', 'user2');
      await service.acceptConnection(connection.id, 'user2');
      
      const isConnected = await service.checkConnection('user1', 'user2');
      expect(isConnected).toBe(true);
    });

    it('should return false for pending connections', async () => {
      await service.requestConnection('user1', 'user2');
      const isConnected = await service.checkConnection('user1', 'user2');
      expect(isConnected).toBe(false);
    });

    it('should work bidirectionally', async () => {
      const connection = await service.requestConnection('user1', 'user2');
      await service.acceptConnection(connection.id, 'user2');
      
      expect(await service.checkConnection('user1', 'user2')).toBe(true);
      expect(await service.checkConnection('user2', 'user1')).toBe(true);
    });

    it('should return false for non-existent connections', async () => {
      expect(await service.checkConnection('user1', 'user2')).toBe(false);
    });
  });

  describe('removeConnection', () => {
    it('should allow either user to remove connection', async () => {
      const connection = await service.requestConnection('user1', 'user2');
      await service.acceptConnection(connection.id, 'user2');
      
      await expect(service.removeConnection(connection.id, 'user1')).resolves.not.toThrow();
      await expect(service.checkConnection('user1', 'user2')).resolves.toBe(false);
    });

    it('should not allow unauthorized users to remove connection', async () => {
      const connection = await service.requestConnection('user1', 'user2');
      await expect(
        service.removeConnection(connection.id, 'user3')
      ).rejects.toThrow('Not authorized to remove this connection');
    });
  });
}); 