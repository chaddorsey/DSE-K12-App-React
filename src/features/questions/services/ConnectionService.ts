import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  where,
  or,
  and,
  serverTimestamp,
  Timestamp,
  QueryConstraint
} from 'firebase/firestore';
import { db } from '@/config/firebase';
import type { Connection, ConnectionStatus } from '../types';

export class ConnectionService {
  private readonly connectionsRef = collection(db, 'connections');

  async requestConnection(userId: string, targetId: string): Promise<Connection> {
    if (userId === targetId) {
      throw new Error('Cannot connect with self');
    }

    // Check for existing connection
    const existingConnection = await this.findExistingConnection(userId, targetId);
    if (existingConnection) {
      throw new Error('Connection already exists');
    }

    // Create new connection
    const connectionDoc = doc(this.connectionsRef);
    const now = new Date();
    
    const connection: Connection = {
      id: connectionDoc.id,
      users: [userId, targetId],
      status: 'pending',
      createdAt: now,
      updatedAt: now
    };

    await setDoc(connectionDoc, {
      ...connection,
      createdAt: Timestamp.fromDate(now),
      updatedAt: Timestamp.fromDate(now)
    });

    return connection;
  }

  async acceptConnection(connectionId: string, userId: string): Promise<Connection> {
    const connectionDoc = await getDoc(doc(this.connectionsRef, connectionId));
    
    if (!connectionDoc.exists()) {
      throw new Error('Connection not found');
    }

    const connection = this.mapConnection(connectionDoc);

    // Verify user is the target of the connection
    if (connection.users[1] !== userId) {
      throw new Error('Not authorized to accept this connection');
    }

    if (connection.status !== 'pending') {
      throw new Error('Connection is not pending');
    }

    const now = new Date();
    const updatedConnection: Connection = {
      ...connection,
      status: 'accepted',
      updatedAt: now
    };

    await updateDoc(doc(this.connectionsRef, connectionId), {
      status: 'accepted',
      updatedAt: Timestamp.fromDate(now)
    });

    return updatedConnection;
  }

  async getConnections(userId: string, status?: Connection['status']): Promise<Connection[]> {
    let queryConstraints: QueryConstraint[] = [
      where('users', 'array-contains', userId)
    ];

    if (status) {
      queryConstraints.push(where('status', '==', status));
    }

    const connectionsQuery = query(
      this.connectionsRef,
      ...queryConstraints
    );

    const snapshot = await getDocs(connectionsQuery);
    return snapshot.docs.map(doc => this.mapConnection(doc));
  }

  async checkConnection(userId: string, targetId: string): Promise<boolean> {
    const connection = await this.findExistingConnection(userId, targetId);
    return !!(connection && connection.status === 'accepted');
  }

  async removeConnection(connectionId: string, userId: string): Promise<void> {
    const connectionDoc = await getDoc(doc(this.connectionsRef, connectionId));
    
    if (!connectionDoc.exists()) {
      throw new Error('Connection not found');
    }

    const connection = this.mapConnection(connectionDoc);

    // Verify user is part of the connection
    if (!connection.users.includes(userId)) {
      throw new Error('Not authorized to remove this connection');
    }

    await deleteDoc(doc(this.connectionsRef, connectionId));
  }

  private async findExistingConnection(userId: string, targetId: string): Promise<Connection | null> {
    const connectionsQuery = query(
      this.connectionsRef,
      where('users', 'array-contains-any', [userId, targetId])
    );

    const snapshot = await getDocs(connectionsQuery);
    if (snapshot.empty) return null;

    const connection = this.mapConnection(snapshot.docs[0]);
    const hasUsers = connection.users.includes(userId) && connection.users.includes(targetId);
    return hasUsers ? connection : null;
  }

  private mapConnection(doc: any): Connection {
    const data = doc.data();
    return {
      id: doc.id,
      users: data.users,
      status: data.status,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate()
    };
  }
} 