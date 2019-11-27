const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser')

const app = express();

app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.use(bodyParser.json())


app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
        res.sendStatus(200)
    }
    else {
        next();
    }
});

app.use('/add',(req,res)=>{
    fs.readFile('./data/people.json', (err, data) => {
        if (err) throw err;
        let people = JSON.parse(data);

        const name = req.body.Name;
        const phone = req.body.Phone
        const Postdata = {"Name": name,"Phone":phone}
        people.push(Postdata)

        fs.writeFile("./data/people.json",JSON.stringify(people),err=>{
            if (err) throw err;
            res.json({msg:"success"})
        })
    });
});

app.use('/delete',(req,res)=>{
    fs.readFile('./data/people.json',(err,data)=>{
        if (err) throw err;
        let people = JSON.parse(data);
        const PeopleDeleted = req.body.Phone
        people = people.filter(function (obj) {
            return obj.Phone !== PeopleDeleted
        });
        fs.writeFile("./data/people.json",JSON.stringify(people),err=>{
            if (err) throw err;
            res.json({msg:"success"})
        })
    })

});


app.use('/',(req,res)=>{
    fs.readFile('./data/people.json', (err, data) => {
        if (err) throw err;
        let people = JSON.parse(data);
        res.json(people)
    });
});





app.listen(process.env.PORT||8080);
