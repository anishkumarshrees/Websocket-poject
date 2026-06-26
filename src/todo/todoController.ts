

  
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
    })
  }
  // add garna ko lagi data haru
  private async handleAddTodo(socket:Socket,data:ITodo){
     try { const {task,deadLine,status}=data
      const todo= await todoModel.create({
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
      socket.emit("todos_response",{
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
}

export default new Todo()







