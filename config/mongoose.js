const mongoose = require("mongoose")

mongoose.connect('mongodb+srv://alpha:camp@cluster0.zbq9l.mongodb.net/todo-list?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true })

const db = mongoose.connection

db.on("error", () => {
  console.log("mongodb error!")
})

db.once("open", () => {
  console.log("mongodb connected!")
})

module.exports = db