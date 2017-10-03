import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

var defaultApp = admin.initializeApp(functions.config().firebase)

const db = admin.database().ref('/');
export default db;

export { db };
export let timestamp = admin.database.ServerValue.TIMESTAMP