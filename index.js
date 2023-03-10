const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "vars/config.env" });
const httpServer = require("./app.js");
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
  },
})

io.on("connection", (socket) => {
  socket.on("insert", (data) => {
    socket.broadcast.emit("insert", data);
  })
  socket.on("update", (data) => {
    socket.broadcast.emit("update", data);
  })
  socket.on("delete", (data) => {
    socket.broadcast.emit("delete", data);
  })
  socket.on("joinOrg", (data) => {
    // find org by id
    socket.broadcast.emit("newRequest", data);
  })
  socket.on("newMember", (data) => {
    socket.broadcast.emit("newMember", data);
  })
  socket.on("projectDeleted", (data) => {
    socket.broadcast.emit("projectDeleted", data);
  });
})

const DATABASE = process.env.DATABASE;
// const DATABASE = process.env.DATABASE_LOCAL;

mongoose.set('strictQuery', true);
mongoose
  .connect(DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
    const PORT = process.env.PORT || 3000;
    httpServer.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
