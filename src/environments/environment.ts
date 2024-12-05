// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  server_url: 'http://localhost:5641',
  servicios_path: 'http://localhost:5641/servicios/',
  //server_url: 'https://b3d4-77-26-122-201.eu.ngrok.io',
  pathSocket: '',
  mapBoxToken: 'pk.eyJ1IjoiZGV2ZWxvcG1lbnRlZGltIiwiYSI6ImNsOG5jdTl1ajAwNm0zd3A4Y2oxNGMxbmwifQ.q-V3iCnVg5r-Wfw66emj-Q'
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/plugins/zone-error' // Included with Angular CLI.
