const express = require('express');

const app = express();


app.get('/', (req, res) => { 
    res.send('Node Scheduler Task App is running on this server') 
    res.end() 
}) 

const PORT = process.env.PORT ||1993;

app.listen(PORT,console.log(
    `Server started on port ${PORT}`));