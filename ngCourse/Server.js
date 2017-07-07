var path     = require("path");
var express	=	require("express");
var multer	=	require('multer');
var Unzipper = require("decompress-zip");
var jsonfile = require('jsonfile');
var file = __dirname+'/uploads/list-of-courses.json';
var obj = {'name': '','url':''};
var app	=	express();
 
var storage	=	multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
	console.log(file.originalname);
	obj['name'] =((file.originalname).split('.')[0]);
	obj['url'] = '/ngCourse/uploads/' + obj['name'];
    callback(null, file.originalname);
  }
});
var upload = multer({ storage : storage}).single('userFile');
app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});
app.post('/api/photo',function(req,res){
	upload(req,res,function(err) {
		if (((req.file.originalname).split('.')[1])=='zip'){
			var filepath = path.join(req.file.destination, req.file.filename);
			var unzipper = new Unzipper(filepath);
			unzipper.on("extract", function () {
				console.log("Finished extracting");	
				jsonfile.writeFile(file, obj, function (err) {
				  console.log(err)
				});
				if(err) {
				  return res.end(err);
				}	
            });
            unzipper.extract({path:'./uploads/'});
        }
		if(err) {
			return res.end("Error uploading file.");
		}
		res.end("File is uploaded",function(err){		
		});
	});	
});
app.listen(3000,function(){
    console.log("Working on port 3000");
});




  