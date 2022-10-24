export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    type: process.env.DATABASE_TYPE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    databaseName: process.env.DB_DATABASE,
    sync: process.env.DB_SYNC,
  },
  jwt: {
    secret: process.env.JWT_SECRET_KEY,
    expireTime: process.env.JWT_EXPIRATION_TIME,
  },
});

export interface Configuration {}
