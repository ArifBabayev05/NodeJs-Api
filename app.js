 const express = require("express")
 require("dotenv").config()
 const app = express()
 const Port = process.env.PORT || 5001

 app.get("/",(req,res)=>{
    res.json({
        message:"Welcome my friend"
    })
 })

 
 app.listen(Port,()=>{
    console.log(`Server: ${Port}`)
 });