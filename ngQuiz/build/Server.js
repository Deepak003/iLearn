var path     = require("path");
var express	=	require("express");
var multer	=	require('multer');
var Unzipper = require("decompress-zip");
var app	=	express();
var storage	=	multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, '../client/assets/data/quiz-upload');
  },
  filename: function (req, file, callback) {
	console.log(file.originalname);
    callback(null, file.originalname);
  }
});
var upload = multer({ storage : storage}).single('userFile');

app.get('/',function(req,res){
      res.sendFile(__dirname + "/ngQuizUpload/index.html");
});

app.post('/api/photo',function(req,res){
	upload(req,res,function(err) {
		if (((req.file.originalname).split('.')[1])=='zip'){
			var, filepath = path.join(req.file.destination, req.file.filename);
			var unzipper = new Unzipper(filepath);
			unzipper.on("extract", function () {
				console.log("Finished extracting");
            });
            unzipper.extract({path:'../client/assets/data/quiz-upload/'});
        }
		if(err) {
			return res.end("Error uploading file.");
		}
		res.end("File is uploaded");
	});
});

app.listen(3000,function(){
    console.log("Working on port 3000");
});
