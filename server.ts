import app = require("./src/app");
import envConfig = require("./src/config/config");
import connectToDb = require("./src/config/db");




function startServer(){
    connectToDb()
    const port = envConfig.port
    app.listen(port,()=>{
        console.log(`sever is running in port [${port}] `)
    })
}

startServer()