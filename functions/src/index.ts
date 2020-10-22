import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
  if (context.auth?.token.admin !== true) {
    return {
      error: 'Only admins can add other admins'
    }
  }

  return admin.auth().getUserByEmail(data.email).then(user => {
    return admin.auth().setCustomUserClaims(user.uid, {
      admin: true,
    }).then(() => {
      return {
        message: `Sucess! ${data.email} has been made admin`
      }
    }).catch(err => err);
  });
});
