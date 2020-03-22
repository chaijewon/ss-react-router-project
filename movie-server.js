const express=require("express")
const request=require("request")
const port=3355;
const app=express();

// 서버 가동
app.listen(port,()=>{
    console.log("Server Start...","http://localhost:3355")
})
const Client=require("mongodb").MongoClient;

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
// real_data?page=1
app.get("/real_data",(req,res)=>{
    /*var url="http://www.kobis.or.kr/kobis/business/main/searchMainDailyBoxOffice.do";
    request({url:url},function (err,request,json) {
        res.json(json);

    })*/
    var page=req.query.page;
    var rowSize=9;
    var skip=(page*rowSize)-rowSize;
    /*
        page =1
        0
        page=2
        9

        ==> Router,Event => 데이터를 서버로 보내는 과정
        ==> JQuery 연결
        ==> 하위 클래스 => 이벤트 연결하는 방법

     */
    var url="mongodb://203.224.133.121:27017";
    Client.connect(url,(err,client)=>{
        var db=client.db("mydb");
        // find() => SELECT * FROM movie
        // SELECT * FROM movie WHERE mno=1
        // find({mno:1})
        // {} {} ==> [{},{}]
        db.collection("movie").find({type:1}).skip(skip).limit(rowSize).toArray(function(err,docs){
            res.json(docs)
            client.close();// 몽고디비 종료
        })
    })

})
// @RequestMapping("a.do")
app.get("/movie_total",(req,res)=>{
    // 몽고디비 연결
    var url="mongodb://203.224.133.121:27017"
    Client.connect(url,(err,client)=>{
        var db=client.db("mydb");
        db.collection("movie").find({type:1}).count(function(err,count){
            res.json({totalpage:Math.ceil(count/9.0)})
            client.close();
            return count;
        })
    })
})







