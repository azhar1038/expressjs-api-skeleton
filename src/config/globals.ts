export const env = {
  NODE_ENV: '',
  NODE_PORT: '',
  DOMAIN: '',
};

export function setEnv(): void {
  env.DOMAIN = process.env.DOMAIN || 'http://localhost';
  env.NODE_ENV = process.env.NODE_ENV || 'development';
  env.NODE_PORT = process.env.PORT || '4000';
}
