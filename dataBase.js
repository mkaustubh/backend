const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  // await mongoose.connect('mongodb+srv://rishabhk5236:rish2023%40gmail.com@cluster0.7i3tzrs.mongodb.net/DSAHelper',{
  await mongoose.connect('mongodb+srv://kaustubhmishra:test15@cluster0.tejdbwq.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true
  }).then(()=>{
    console.log("Connection Successfull")
  }).catch((err)=>console.log("No Connection Established"+err));
  
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

module.exports=main;