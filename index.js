const express = require("express");
const cors = require("cors");
const fs = require('fs');
const request = require('request');
const bodyParser = require("body-parser");
// const { getChats } = require("./controllers/chatController");
const { fetchChatWithText } = require("./ApiCalls/chatApi");
const { fetchImage } = require("./ApiCalls/imageApi");
require("dotenv").config();
const app = express();
app.use(cors({
    origin:"*"
}));

// Parse incoming request bodies in a middleware before your handlers, available under req.body property
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = process.env.PORT || 4000;
app.get("/", (req, res, next) => {
  res.json({ message: "Welcome to voice-gpt" });
});

app.post("/chat", (req, res, next) => {
  const { text } = req.body;
  if(text){

      fetchChatWithText(text)
        .then((response) => {
            
          if (response && response.choices && response.choices.length > 0) {
            let firstChoice = response.choices[0];
            res.status(200).json({
              statusCode: 200,
              reply: firstChoice,
            });
          } else {
            res.status(204).json({
              statusCode: 204,
              reply: null,
            });
          }
        })
        .catch((err) =>
          res.status(400).json({
            statusCode: 400,
            reply: null,
            error: err,
          })
        );
  }else{
    res.status(400).json({
        statusCode: 400,
        reply: null,
        error: "text is required.",
      })
  }

 
});



app.post("/images",(req,res,next)=>{
    const { text } = req.body;
    if(text){

        fetchImage(text)
        .then((response) => {
            
            if (response && response.data && response.data.length > 0) {
              let firstChoice = response.data[0];
              res.status(200).json({
                statusCode: 200,
                reply: firstChoice,
              });
            } else {
              res.status(204).json({
                statusCode: 204,
                reply: null,
              });
            }
          })
          .catch((err) =>
            res.status(400).json({
              statusCode: 400,
              reply: null,
              error: err,
            })
          );
    }else{
        res.status(400).json({
            statusCode: 400,
            reply: null,
            error: "text is required.",
          })
    }

})




app.get("/img/download",(req,res,next)=>{
    const {imgUrl} = req.query

    if(imgUrl){

        let download = function(uri, filename, callback){
            request.head(uri, function(err, res, body){    
              request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
            });
          };
          
          download(imgUrl, `chatgpt_${Date.now()}.png`, function(){
            console.log('done');
            res.status(200).json({
                statusCode:200,
                message:"Downloaded Successfully."
            })
          });
          

    }else{
        res.status(400).json({
            statusCode:400,
            reply:null,
            error:"image url is required."
        })
    }
    
    
})

app.listen(port, () => console.log(`Server is running at port ${port} .....`));
