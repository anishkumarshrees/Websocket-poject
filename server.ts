import app = require("./src/app");
import envConfig = require("./src/config/config");




function startServer(){
    const port = envConfig.port
    app.listen(port,()=>{
        console.log(`sever is running in port [${port}] `)
    })
}

startServer()