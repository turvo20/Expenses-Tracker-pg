import 'dotenv/config'


export default {
    SERVER_PORT: process.env.SERVER_PORT || 6500,
    HOST: process.env.HOST + process.env.SERVER_PORT,
    DB: {
        POSTGRES_USER: process.env.POSTGRES_USER,
        POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
        POSTGRES_DB: process.env.POSTGRES_DATABASE,
        POSTGRES_HOST: process.env.POSTGRES_HOST,
        DIALECT: process.env.DIALECT
    },
    PREFIX: '/racdev/api/v1',
    PAYPAL_CLIENT_ID: process.env.CLIENT_ID,
    PAYPAL_SECRET_KEY: process.env.SECRET_KEY,
    PAYPAL_API: 'https://api-m.sandbox.paypal.com',
    TOKEN_SECRET: process.env.JWT_SECRET
}