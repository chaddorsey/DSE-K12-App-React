import Papa from 'papaparse';

export interface KnownUserData {
  email: string;
  displayName: string;
  role: string;
  organization: string;
  image?: string;
  photoURL?: string;
}

let knownUsersCache: KnownUserData[] | null = null;

export async function getKnownUsers(): Promise<KnownUserData[]> {
  if (knownUsersCache) return knownUsersCache;

  const response = await fetch('/data/simpsons_users.csv');
  const fileContent = await response.text();
  
  const parseResult = Papa.parse<KnownUserData>(fileContent, {
    header: true,
    skipEmptyLines: true
  });
  
  const users = parseResult.data;

  // Add photoURL for each user
  knownUsersCache = users.map(user => ({
    ...user,
    photoURL: user.image ? `assets/avatars/${user.image}` : undefined
  }));

  return knownUsersCache;
}

export async function findKnownUser(email: string): Promise<KnownUserData | null> {
  const users = await getKnownUsers();
  return users.find(user => user.email.toLowerCase() === email.toLowerCase()) || null;
} 