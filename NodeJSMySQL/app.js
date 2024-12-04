/*
const express = require('express');
const app = express();

app.get('/', (req, res) => 
{
    res.send('hello Express');
});

app.get('/mypage', (req, res) => 
{
    res.send('hello myPage');
});

app.get('/login', (req, res) => 
{
    let {userId, passward} = req.query;
    console.log("reqed ID :: " + userId);
    console.log("reqed Ps :: " + passward);

    res.send("hello Login!! <br> id : " + userId + '<br> pw :' + passward);
});

app.listen(3000, () => {
    console.log("app server is running");
}); */ // app.js

//CRUD.js
const express = require('express'); //express 모듈로드
const bodyParser = require('body-parser'); //body-parser 모듈로드
const app = express(); //express 앱 생성
const mysql = require('mysql2'); //mysql2 모듈 사용
const mysqlConfig = require('./mysqlConfig'); // config 파일로드
const conn = mysql.createConnection(mysqlConfig); //mysql 접속생성

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.get('/', (req, res) => {
    res.send('{"userid":"TestUser005","id":"User001","title","completed":true}');
});

//create
app.post('/new', (req, res, err) => {
    if(req.body.userId !== null || req.body.userId != undefined){
        console.log(req.body);
        //res.send(req.body);
        let newQuery = "INSERT INTO userdata(userid,userps) VALUES(?,?)";
        let param = [userid = req.body.userId, userps = req.body.userPw];
        conn.query(newQuery, param, (err, row, fields) => {
            if(!err){
                console.log('Data INSERT Successfully');
                res.send('Insert Successfully');      
            }  
            else console.log(err);
        });
    }
    else {
        res.send(err);
    }
});

//Read
app.post('/select', (req, res, err) => {
    if(req.body.userId !== null){
        console.log(req.body);
        let selectQuery = "SELECT score,gold FROM userdata WHERE userid=?";
        let param = [userid = req.body.userId];
        // row = select 해온 해당 결과값
        conn.query(selectQuery, param, (err, row, fields) => {
            if(!err){
                if(row.length === 0){
                    console.log("USERID is null");
                    res.send("USERID is null");
                    // 만약 row가 0이다 == 도출된 결과가 없음 == 유저id가 널임
                }
                else{
                    res.send(row);
                }
            }
            else{
                console.log(err);
            }
        });
    }
    else{
        res.send(err);
    }
});

//update
app.post('/update', (req, res, err) => {
    if(req.body.userId !== null){
        console.log(req.body);
        
        let id = req.body.userId;
        let thisgold = req.body.gold;
        let thisscore = req.body.score;
        
        let updateQuery = "UPDATE userdata SET gold=?, score=? WHERE userid=?";
        let param = [gold = thisgold, score = thisscore, userId = id];
        conn.query(updateQuery, param, (err, row, feilds) => {
            if(!err){
                res.send("Update Succecssfully");
            }
            else{
                console.log(err);
            }
        });
    }
    else{
        res.send(err);
    }
});

//delete
app.post('/delete', (req, res, err) => {
    if(req.body.userId !== null){
        console.log(req.body);
        let thisid = req.body.userId;
        let deletQuery = "DELETE FROM userdata WHERE userid=?";
        let param = [userid = thisid];
        
        conn.query(deletQuery, param, (err, row, feilds) => {
            if(!err){
                console.log(thisid + ":: Data Deleted");
                res.send("Deleted.");
            }                
            else{
                console.log(err);
            }
        });
    }
    else{
        res.send(err);
    }
});

//read
app.post('/login', (req, res, err) => {
    if(req.body.userId !== null){
        console.log(req.body);
        let thisid = req.body.userId;
        let thispw = req.body.userPw;

        let loginQuery = "SELECT userps FROM userdata WHERE userid=?";
        let param = [userId = thisid];

        conn.query(loginQuery, param, (err, row, feilds) => {
            if(!err){
                console.log("Query Result::: " + JSON.stringify(row[0])); // DB 뒤져 나온 결과 값
                if(row[0] !== undefined){
                    if(row[0].userps === thispw && row[0].userps !== undefined){
                        let TimeStamp = new Date();
                        console.log(TimeStamp + " :: " + thisid + " :: Login Successfully");
                        res.send("Login Successfully");
                    }
                    else{
                        let TimeStamp = new Date();
                        console. log(TimeStamp + " :: " + thisid + " :: Login Failed");
                        res.send("Login Failed");
                    }
                }
            }                
            else{
                console.log(err);
            }
        });    
    }
    else{
        res.send(err);
    }
});

//read
app.post('/ranking10', (req, res, err) => {
    if(req !== null){
        let rankingQuery = "SELECT userid, score FROM userdata ORDER BY score DESC LIMIT 10";
        let param = [];

        conn.query(rankingQuery, param, (err, row, feilds) => {
            if(!err){
                res.send(row);
            }
            else{
                console.log(err);
            }
        });
    }
    else{
        console.log(err);
    }
});

app.listen(3000, () => {
    console.log("CRUD server is running");
});

