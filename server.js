const express = require("express");
const cors = require("cors");
const db = require('./app/models')
const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

db.mongoose.connect(db.url,{
    useNewUrlParser : true, // use new url parser accept the any url wich new
    useUnifiedTopology : true,
}).then(()=>{
    console.log("Connectet to the database....")
}).catch(err => {
    console.log("Can't connect to tne database...",err);
    process.exit();
})

app.use(cors(corsOptions));

//parse requst of content type
app.use(express.json());

app.use(express.urlencoded({extended:true}))// data ko encoded formate me display karata hai

app.get('/',function(req,res){
    res.json({X:"Welcome To My Application"})
})

require("./app/routes/index.routes")(app)

const port = process.env.port || 8081;

app.listen(port,()=>{
    console.log(`Server is running on the port ${port}....`);
})