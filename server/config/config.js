require('dotenv').config({ path: `${__dirname}/.env` });

const { env } = process;

module.exports = {
	name: env.APP_NAME,
	baseUrl: env.APP_BASE_URL,
  port: env.PORT,
  redis_host: env.REDIS_HOST,
  redis_port: env.REDIS_PORT,
  redis_password: env.REDIS_PASSWORD,

  development: {
    url: env.DEV_DATABASE_URL_MONGO,
    database: env.DEV_DATABASE_MONGO,
    host: env.HOST_MONGO,
    port: env.PORT_MONGO,
    username: env.USERNAME_MONGO,
    password: env.PASSWORD_MONGO,
  },
  test: {
    url: env.TEST_DATABASE_URL_MONGO,
    database: env.TEST_DATABASE_MONGO,
    host: env.HOST_MONGO,
    port: env.PORT_MONGO,
    username: env.USERNAME_MONGO,
    password: env.PASSWORD_MONGO,
  },
  production: {
    url: env.DATABASE_URL_MONGO,
    database: env.DATABASE_MONGO,
    host: env.HOST_MONGO,
    port: env.PORT_MONGO,
    username: env.USERNAME_MONGO,
    password: env.PASSWORD_MONGO,
  },
}