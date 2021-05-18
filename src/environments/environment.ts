// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://stackoverflow-bba0e-default-rtdb.firebaseio.com/everyQuestions.json',
  firebase: {
    apiKey: 'AIzaSyDMiSDGPRxa6EH3VzY59KtK2l07CECRGAs',
    authDomain: 'stackoverflow-bba0e.firebaseapp.com',
    projectId: 'stackoverflow-bba0e',
    storageBucket: 'stackoverflow-bba0e.appspot.com',
    messagingSenderId: '4422216162',
    appId: '1:4422216162:web:78f905c2bee9cfc6f6b1bb'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
