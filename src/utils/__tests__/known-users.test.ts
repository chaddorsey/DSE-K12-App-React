import { getKnownUsers, findKnownUser } from '../known-users';
import Papa from 'papaparse';

// Mock fetch and Papa.parse
global.fetch = jest.fn();
jest.mock('papaparse');

describe('Known Users Utils', () => {
  const mockCSVData = `email,displayName,role,organization,image
homer@springfield.com,Homer Simpson,user,Nuclear Plant,homer.png
marge@springfield.com,Marge Simpson,admin,Home,marge.png`;

  beforeEach(() => {
    (fetch as jest.Mock).mockResolvedValue({
      text: () => Promise.resolve(mockCSVData)
    });
    (Papa.parse as jest.Mock).mockReturnValue({
      data: [
        {
          email: 'homer@springfield.com',
          displayName: 'Homer Simpson',
          role: 'user',
          organization: 'Nuclear Plant',
          image: 'homer.png'
        },
        {
          email: 'marge@springfield.com',
          displayName: 'Marge Simpson',
          role: 'admin',
          organization: 'Home',
          image: 'marge.png'
        }
      ]
    });
  });

  it('loads and parses CSV data correctly', async () => {
    const users = await getKnownUsers();
    
    expect(fetch).toHaveBeenCalledWith('/data/simpsons_users.csv');
    expect(users).toHaveLength(2);
    expect(users[0].photoURL).toBe('/assets/avatars/homer.png');
  });

  it('finds known user by email', async () => {
    const user = await findKnownUser('homer@springfield.com');
    
    expect(user).toBeDefined();
    expect(user?.displayName).toBe('Homer Simpson');
  });

  it('returns null for unknown email', async () => {
    const user = await findKnownUser('unknown@example.com');
    expect(user).toBeNull();
  });
}); 