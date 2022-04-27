import { Client } from 'pg'

export const client = new Client({
    host: process.env.DATABASE_HOST || '0.0.0.0',
    port: parseInt(<string>process.env.DATABASE_PORT) || 5432,
    user: process.env.DATABASE_USERNAME || 'dev',
    password: process.env.DATABASE_PASSWORD || 'dev',
    database: process.env.DATABASE_DATABASE || 'dev'
})

client.connect().then(() => {
    if (process.env.NODE_ENV != 'dev') return

    console.log("Database connected!")
}).catch((err) => {
    if (process.env.NODE_ENV != 'dev') return

    console.error(err)
})