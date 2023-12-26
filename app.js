//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");

const Item = require("./Item");
const List = require("./List");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://bikuesan9:Benikad123@cluster0.qc097d0.mongodb.net/todolistDB")


run()
async function run() {
  const item1 = await new Item({
          name: "Welcome To Todolist App"
        });
  const item2 = await new Item({
          name: "You can Add Your Daily Task"
        });
  const item3 = await new Item({
          name: "Use the + botton to add"
        });   


app.get("/", function(req, res) {
  const day = date.getDate();
  Item.find().then(function (foundItems) {
    if (foundItems.length === 0) { 
        Item.insertMany([item1, item2, item3])
        console.log("Sucessfully added to database")
      
 } else  {
  res.render("list", {listTitle: day, newListItems: foundItems});
 }
  })
});

//Express route parameter
app.get("/:customListName", function(req,res){
  const customListName = req.params.customListName;
  

  List.findOne({name: customListName}).then(function (foundList, err) {
    
    if (err) { 
      if (foundList){
        console.log("Dosent Exit!");
      }  
      if(!foundList){
        console.log("Exist");
      }
    } 
 });


  const list = new List({
    name: customListName,
    items: ([item1, item2, item3])   
  });

  list.save();

});
}




app.post("/", function(req, res){

  const itemName = req.body.newItem;

  const item = new Item({
      name: itemName
    });
    item.save();
    res.redirect("/");
  
});

app.post("/delete", function(req, res){
  const checkedItemId = req.body.checkbox;

  Item.findByIdAndRemove(checkedItemId)
   .then(() => {
    res.redirect("/");
   })
   .catch(error => {
    console.log(`Error deleting user by ID: ${error.message}`);
   });
});





app.get("/about", function(req, res){
  res.render("about");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}


app.listen(port, function() {
  console.log("Server started on port 3000");
});
