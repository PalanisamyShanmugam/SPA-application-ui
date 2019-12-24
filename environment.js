// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --configuration=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  cmsURI: '',
  cmsUriPath: 'cms/wp-json/wp/v2/',
  apiURI: '',
  appointmentAssistanceURI:
    'https://secure.questdiagnostics.com/ViewsFlash/servlet/viewsflash?cmd=page&pollid=contactus!appt_sched_cmt3',
  httpCacheAge: 60000, // 1 minute
  googleRecaptchaKey: '6LfEvQcUAAAAAOzOREVV7OYMnqDM-9Ej_XKhc5ae',
  invisibleRecaptchaKey: '6Le9fqIUAAAAAAhDn_r_DNEkYJAB_Epf01tKOzFi', //'6LcuFqIUAAAAAMhlEG1Ny01caSPyPLHKr5UtlNw5',
  defaultAuthedRoute: '/dashboard',
  loginPath: '/mq-service/login-request?myquest-app-target='
};
