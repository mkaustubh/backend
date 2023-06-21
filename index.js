const express = require('express');
const connectToMongo=require('./dataBase')
connectToMongo();

const cors=require('cors');

const app = express()

const port = 5000


app.use(express.json());
app.use(cors())
//Available routes
app.use('/api/auth',require('./Routes/auth'));
app.use('/api/adminAuth',require('./Routes/adminAuth'));
app.use('/api/playlist',require('./Routes/playlist'));
app.use('/api/oneshotvideo',require('./Routes/oneshotvideo'));
app.use('/api/animatedvideo',require('./Routes/animatedvideo'));

// these are for using future if we want to make the data structures,algorithms and pointer videos dynamic 

// app.use('/api/datastructures',require('./Routes/datastructures'));
// app.use('/api/algorithms',require('./Routes/algorithms'));
// app.use('/api/pointers',require('./Routes/pointers'));
app.use('/api/sendMail',require('./Routes/sendMail'));
app.use('/api/notes',require('./Routes/notes'));
app.use('/api/questionPapers',require('./Routes/questionPapers'));
app.use('/api/questionPaperYear',require('./Routes/questionPaperYear'));
app.use('/api/jobs',require('./Routes/jobs'));


app.listen(port, () => {
    console.log(`DSA Helper app listening on port ${port}`)
  })