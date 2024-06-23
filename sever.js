var express=require("express")
var bodyparser=require("body-parser")
var mongoose=require("mongoose")

const app=express()
app.use(bodyparser.json())
app.use(express.static('public'))
app.use(bodyparser.urlencoded({
    extended:true
}))
mongoose.connect('mongodb+srv://prasadkumarrangisetti:root@cluster0.v835e0q.mongodb.net/')
var db=mongoose.connection
db.on("error",()=>console.log("Error in connecting Database"))
db.once("open",()=>console.log("Connected to Database"))
app.post("/add",(req,res)=>{
    var select_category=req.body.select_category
    var amount=req.body.amount
    var info=req.body.info
    var date=req.body.date

    var data={
        "Category":select_category,
        "Amount":amount,
        "Info":info,
        "Date":date
    }
    db.collection("users").insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully")
    })
})

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin":'*'
    })
    return res.redirect("index.html");
}).listen(3000)
console.log("Listening on port 3000")