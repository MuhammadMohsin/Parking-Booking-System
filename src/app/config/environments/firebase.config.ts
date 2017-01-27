import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
export const firebaseConfig = {
  apiKey: "AIzaSyC7oBZ_NV_nIEz45XrIcDPfwChNMXyfrHc",
  authDomain: "parking-system-e5c6d.firebaseapp.com",
  databaseURL: "https://parking-system-e5c6d.firebaseio.com",
  storageBucket: "parking-system-e5c6d.appspot.com",
};
export const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};
