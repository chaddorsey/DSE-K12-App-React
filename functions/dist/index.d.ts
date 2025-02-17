import * as functions from 'firebase-functions';

declare const setUserRole: functions.HttpsFunction & functions.Runnable<any>;

export { setUserRole };
