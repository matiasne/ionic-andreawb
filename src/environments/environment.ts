// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  desarrollando:true,
  url:'https://testing.api.keysapp.com.ar/v1/',
  production: false,
  serverKey: 'AAAAxyLigj8:APA91bFU8sovIsO9_i-tYZuRHsO6T7KQ-YW_pp52pLbWg2ovR2xTGswh4KeAg6jtBI-e_K4B-IRjvNYbY2aJtLhN06egiT6Zk8Iqm05QCz2zgjf78etmf005Baj_XA0IjHh8ZWGhVLsv',
  firebase: { //para las push notifications
    vapidKey: 'BN0uJKwH2WUhjQFg7HkAYR8V8eoCM77kHUQzO124aTt530qs1M4gUq4gDoPWSNOwpge5A4IsT55YrinEpncoMhM'
  },
  webClientId:"855283761727-t6tr49r1mkn8uj02dcpouqn0045qrvbv.apps.googleusercontent.com" //para login
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
