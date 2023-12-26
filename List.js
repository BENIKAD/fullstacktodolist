const mongoose = require("mongoose")

const itemschema = new mongoose.Schema({
        name: String,
});


const listSchema = {
    name: String,
    items: [itemschema]
  };
  
const List = mongoose.model("List", listSchema)

module.exports = List;