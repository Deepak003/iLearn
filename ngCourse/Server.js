var fs = require('fs');
var path     = require("path");
var express	=	require("express");
var multer	=	require('multer');
var Unzipper = require("decompress-zip");
var jsonfile = require('jsonfile');
var file1 = __dirname+'/uploads/list-of-courses.json';
var _objCourse = {'name': '','url':''};
var obj1=[];
var app	=	express();
 
var storage	=	multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
	console.log(file.originalname);
	_objCourse['name'] =((file.originalname).split('.')[0]);
	_objCourse['url'] = '/ngCourse/uploads/' + _objCourse['name'];
	fs.readFile(file1, 'utf8', function (err,data) {
	if (err) {
	  return console.log(err);
	}
	if(data!=null){
		data = data.replace('}{','},{');
		data = '['+data+']';
		data = data.replace('[[','[');
		data = data.replace('[\n[','[');
		data = data.replace(']]',']');
		data = data.replace(']\n]',']');
		obj1 = JSON.parse(data);
		obj1.push(_objCourse);
	}
    });
    callback(null, Date.now()+'_'+file.originalname);
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
			console.log('__dirname:'+__dirname);
			console.log('filepath:'+filepath);
			var unzipper = new Unzipper(filepath);
			unzipper.on("extract", function () {
				console.log("Finished extracting");	
				if(err) {
				  return res.end(err);
				}else{
					var _file = __dirname+'\\'+filepath;
					console.log('_file::'+_file);
					fs.unlinkSync(_file);
					fs.exists(_file, function(exists) {
						if(exists) {
							console.log(gutil.colors.green('File still exists....'));
						} else {
							console.log('File deleted..');
						}
					});
				}	
            });
            unzipper.extract({path:'./uploads/'});
        }
		if(err) {
			return res.end("Error uploading file.");
		}
		res.end("File is uploaded",function(err){		
		});
		jsonfile.writeFile(file1, obj1,function (err) {
		  console.log('file1:'+file1);
		  console.log(err);
		});
		
	});	
});
app.listen(3000,function(){
    console.log("Working on port 3000");
});




  