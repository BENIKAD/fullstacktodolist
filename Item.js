const mongoose = require("mongoose")

const itemschema = new mongoose.Schema({
        name: String,
});


const Item = mongoose.model("Item", itemschema)

// module.exports=mongoose.model("Item", itemschema)

module.exports = Item;