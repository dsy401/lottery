const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');


const app = express();

app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
});

app.use('/',(req,res)=>{
    let result = []
    fs.createReadStream('./data/people.csv')
        .pipe(csv())
        .on('data',(row)=>{
            result.push(row)
        }).on("end",()=>{
            res.json(result)
    })

});



app.listen(process.env.PORT||8080);
