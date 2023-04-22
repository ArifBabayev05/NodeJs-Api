 const express = require("express")
 const app = express()
 const Port = process.env.PORT || 5001

 app.get("/",(req,res)=>{
    res.json({
        message:"Welcome my friend"
    })
 })

 // npx kill-port 5001 -y
 app.listen(Port,()=>{
    console.log(`Server: ${Port}`)
 });