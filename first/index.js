// app.js

var express = require('express');
var app = express(); 
var ejs = require('ejs'); // html 랜더링
var bodyParser = require('body-parser'); // post 전송방식 사용하기 위해
const spawn = require('child_process').spawn;
const fs = require('fs');
const result=spawn('python',['start.py']);



app.set("views", __dirname); // 폴더지정
app.set("view engine", "ejs");
app.engine("ejs", ejs.renderFile);
app.use(bodyParser.urlencoded({extend : false})); // use() 를 통해 연결 시킨다! (사용하기 위해)
app.use(bodyParser.json());







app.get('/', function(req, res){ 

    res.render('index.ejs'); // ejs(html)파일 보여줄 때 이렇게 render() 사용

});



app.post('/form_receiver', function(req, res){

    var title = req.body.title;
    var desc = req.body.desc;
    res.send("제목 : " + title + "\n" + "내용 : " + desc); // 사용자에게 지정한 값을 응답해줌
    const Drive={
        트럭: title,
        운행: desc,
    }
    
    fs.writeFileSync("./Drive.json",JSON.stringify(Drive));

});



app.listen(8050, ()=>{

    console.log("8050번 포트에 연결 성공!");

}); // 3050번 포트를 listening, 리스닝 성공 시 콜백메소드 실행하여 메시지 출력