import * as admin from 'firebase-admin';
import { setUserRole } from './auth/setUserRole';

admin.initializeApp();

export { setUserRole }; 