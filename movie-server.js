const express=require("express")
const request=require("request")
const port=3355;
const app=express();

// 서버 가동
app.listen(port,()=>{
    console.log("Server Start...","http://localhost:3355")
})
const Client=require("mongodb").MongoClient;

app.get("/",(req,res)=>{
    /*var url="http://www.kobis.or.kr/kobis/business/main/searchMainDailyBoxOffice.do";
    request({url:url},function (err,request,json) {
        res.json(json);

    })*/
    var url="mongodb://203.224.133.121:27017";
    Client.connect(url,(err,client)=>{
        var db=client.db("mydb");
        // find() => SELECT * FROM movie
        // SELECT * FROM movie WHERE mno=1
        // find({mno:1})
        // {} {} ==> [{},{}]
        db.collection("movie").find({}).toArray(function(err,docs){
            res.json(docs)
        })
    })

})