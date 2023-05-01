const http = require("http")
const app = require("./app")
require('dotenv').config();

const Port =  process.env.PORT || 5000

const server = http.createServer(app);

server.listen(Port,()=>{
    console.log(`works on ${Port}`)
})