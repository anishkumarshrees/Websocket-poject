import 'dotenv/config';


const envConfig={
    port : process.env.PORT,
    mongoConnectionString : process.env.BACKEND_URL
}

export = envConfig
