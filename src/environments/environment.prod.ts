export const environment = {
  production: true,
  apiUrl: 'https://api.yourdomain.com/v1',
  auth: {
    tokenKey: 'prod_auth_token',
    refreshTokenKey: 'prod_refresh_token',
    tokenExpiry: 86400 // 24 hours in seconds
  },
  enableDebug: false,
  recaptchaKey: 'your-prod-site-key',
  sentryDsn: 'your-sentry-dsn',
  featureFlags: {
    enableExperimental: false,
    maintenanceMode: false
  }
};