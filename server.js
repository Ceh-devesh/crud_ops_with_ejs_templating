const express = require("express")
const app = express()
const port = 4000;
const path = require("path");
const userModel = require("./models/user")
var methodOverride = require('method-override')

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine", "ejs")



// create Route
app.get("/create", (req,res)=>{
    res.render("create")  //render the create.ejs file
})

// read route (view the all the users which were created)
app.get("/read", async (req,res)=>{         //we have to write async and await when we 
    let allUsers = await userModel.find();  //userModel.find() is a MongoDB command for view all the collections
    res.render("read", {user:allUsers})
})

app.get("/update/:id", async (req,res)=>{
    let user = await userModel.findOne({_id: req.params.id})
    res.render("update", {user})
    console.log(user._id)
})
app.post("/update/:id", async (req,res)=>{
    let {name, age, location} = req.body;
    let user = await userModel.findOneAndUpdate({_id: req.params.id}, {name,age,location}, {new:true} )
    res.redirect("/read")
    
})

app.get("/delete/:id", async (req, res) => {
     await userModel.findOneAndDelete({ _id: req.params.id });
   
    res.redirect("/read")
});
  



app.post("/create", async (req,res)=>{
    let {name,age,location} = req.body;
  let createdUser = await  userModel.create({
        name,
        age,
        location
    })
    console.log(createdUser)
    res.redirect("/read")
})








app.get("/", (req,res)=>{
    res.send("server started")
})

app.listen(port,()=>{
    console.log(`server is listening on port number ${port}`)
})