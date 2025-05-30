export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  auth: {
    tokenKey: 'auth_token',
    refreshTokenKey: 'refresh_token',
    tokenExpiry: 3600 // 1 hour in seconds
  },
  enableDebug: true,
  recaptchaKey: 'your-site-key',
  sentryDsn: '',
  featureFlags: {
    enableExperimental: false,
    maintenanceMode: false
  },
   firebase: {
    apiKey: "AIzaSyAD5kBjCEA8eLSX46JRzBl1xwsFD-K_ppk",
    authDomain: "rrhh-nomina.firebaseapp.com",
    projectId: "rrhh-nomina",
    storageBucket: "rrhh-nomina.firebasestorage.app",
    messagingSenderId: "188036896174",
    appId: "1:188036896174:web:4ff4d4b0bc2b5ede1de43f",
    measurementId: "G-NH07RR3XCS"
  }
};

