

  
import { Status } from "./todoTypes.js";
import type { Socket } from "socket.io";
import { getSocketIo } from "../../server.js";
import todoModel from "./todoModel.js";
import { todo } from "node:test";
import type { ITodo } from "./todoTypes.js";

class Todo{
  private io= getSocketIo()
  constructor(){
    this.io.on("connection",(socket:Socket)=>{
      console.log("new client connected")
     socket.on("addTodo",(data)=>this.handleAddTodo(socket,data))
     socket.on("deleteTodo",(data)=>this.handleDeleteTodo(socket,data))
     socket.on("fetchTodos",(data)=>this.getPendingTodos(socket))
    })
  }
  // add garna ko lagi data haru
  private async handleAddTodo(socket:Socket,data:ITodo){
     try { const {task,deadLine,status}=data
    const todo =  await todoModel.create({
        task,
        deadLine,
        status
        
      })
      console.log(todo)
      
    const todos= await todoModel.find()
     socket.emit("todos_updated",{
        status:"success",
        data : todos
      })
      return;
      
     } catch (error) {
    socket.emit("todo_response",{
        status:"error",
        error
      })
     }
    

  }
  //delete garna ko lagi data haru
  private async handleDeleteTodo(socket:Socket,data:{id:string}){
    try {
        const {id} = data 
        const deleteTodo = await todoModel.findByIdAndDelete(id)
        if(!deleteTodo){
            socket.emit("todo_response",{
                status : "error", 
                message : "Todo not found"
            })
            return;
        }
        const todos = await todoModel.find({status:Status.Pending})
        socket.emit("todos_updated",{
            status : "success", 
            data : todos
        })
       } catch (error) {
        socket.emit("todo_response",{
            status : "error", 
            error
        })
       }

    
  }
  private async handleUpdtaeTodoStatus(socket:Socket,data:{id:string,status:Status}){
    try {
        const {id,status}=data
      //new:true le update vae sake paxi ko data store garxa
    const todo=  await todoModel.findByIdAndUpdate(id,{status},{new:true})
    if(!todo){
      socket.emit("todo_response",{
        status:"error",
        message:"todo not found"
      })
      return;
    }
    const todos =await todoModel.find({status:Status.Pending})
      socket.emit("todos_updated",{
        status:"success",
        data:todos
      
    })
      
    } catch (error) {
      socket.emit("todo_response",{
            status : "error", 
            error
    })
  }
}
private async getPendingTodos(socket:Socket){
 try {
   const todos= await todoModel.find({status:Status.Pending})
  socket.emit("todos_updated",{
    status:"success",
    data:todos
  })
 } catch (error) {
  socket.emit("to_reponse",{
    status:"error",
    error
  })
 }
}
}

export default new Todo()







