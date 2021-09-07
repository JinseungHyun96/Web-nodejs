var express = require('express'); 
var http = require('http'); 
var path = require('path');
var bodyParser = require('body-parser'); 
var serveStatic = require('serve-static'); //서버 열기 위함
var fs=require('fs');

const spawn =require('child_process').spawn; // 파이썬 함수 실행을 위한것

//express 객체 생성
var app = express();
 
 
// body-parser : post로 요쳥했을 때의 요청 파라미터 확인 방법을 제공
// body-parser를 이용해 application/x=www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({extended:false}));
// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json());
 
app.use('/', serveStatic(path.join(__dirname,'HTML'))); //server열면서 HTML에있는 html을 사용

app.post('/form_receiver', function(req, res){ // post로 form_receiver에 데이터 게시

    var title = req.body.title;// body의 title 데이터 
    var desc = req.body.desc; // body의 desc 데이터 
    res.send("제목 : " + title + "\n" + "내용 : " + desc); // 사용자에게 지정한 값을 응답해줌
    const Drive={ //json 형식으로 만들기위해서 저장
        트럭: title,
        운행: desc,
    }
    
    fs.writeFileSync("./Drive.json",JSON.stringify(Drive)); // json파일에 저장

    const result = spawn('python',["C:\\Users\\asall\\Desktop\\React\\nodejs\\second\\python\\index.py",title,desc]); //title과 desc를 인수로 파이썬에 전달
    result.stdout.on('data', function(data) {
         console.log(data.toString()); 
    }); 
    // 에러 발생 시, stderr의 'data'이벤트리스너로 실행결과를 받는다. 
    result.stderr.on('data', function(data) { 
        console.log(data.toString()); 
    });


});
 
http.createServer(app).listen(8050, function(){ //서버 열기
    console.log('Express server start....');
});