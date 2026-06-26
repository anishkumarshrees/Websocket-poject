
import app from "./src/app.js";
import envConfig from "./src/config/config.js";
import connectToDb from "./src/config/db.js";
import { Socket, Server } from "socket.io";

let io:Server | undefined;
function startServer(){
    connectToDb()
    const port = envConfig.port
  const server =  app.listen(port,()=>{
        console.log(`sever is running in port [${port}] `)
    })
   io =   new Server (server)
        // cors:{
        //     origin: "http://localhost:5173"
        // }
        //kei data leuna paryo vani on use garni
        // io.on("connection",(socket)=>{

        //     socket.on("hello",(data)=>{
        //         console.log(data)
        //         //io.emit garey sabai lai janxa edi sabai user lai notification pathauna xa vani io gani 
        //         //socket le chai jasle mageko xa teslai matra pathauna xa vani socket.emit use garni
        //         io.emit("response",{
        //             message : " data revevied vayo"
        //         })
        //     })
        //     // console.log(socket)
        //     console.log("someone connected (client)")
        // })
        //kei data pathauna paryo vani emit use garni
    
}
function getSocketIo(){
    if(!io){
        throw new Error("socketio initalized vako xaina ")
    }
    return io;
}
export {getSocketIo}

startServer()