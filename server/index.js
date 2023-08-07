
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const {Server}=require("socket.io")
const http = require('http');
const Dburl="mongodb://127.0.0.1:27017/taskDb"
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
const taskRoute = require('./routes/TaskRoute');
app.use('/tasks', taskRoute);
const userRoute = require('./routes/UserRoute');
app.use('/users', userRoute);
mongoose.connect(Dburl).then(() => {
const server = app.listen(8080, function(){
    const port = server.address().port;
    console.log("App is running on port ", port);
   })
}).catch(err => console.log(err));
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on('connection', (socket) => {
  console.log('A user connected.');

  socket.on("task_delete",(data)=>{
    socket.broadcast.emit("receive_taskDelete",data);

  });
  socket.on("task_add",(data)=>{
    socket.broadcast.emit("receive_taskAdd",data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected.');
  });
});
server.listen(3001, () => {
  console.log('Socket.IO server is running on http://localhost:3001');
});



