var fs = require('fs');
var path     = require("path");
var express	=	require("express");
var multer	=	require('multer');
var Unzipper = require("decompress-zip");
var jsonfile = require('jsonfile');
var file1 = __dirname+'/uploads/list-of-courses.json';
var _objCourse = {'name': '','url':'','date_time_stamp':''};
var obj1;

var app	=	express();
 
function formatAMPM(date) {
    // gets the hours
    var hours = date.getHours();
    // gets the day
    var days = date.getDay();
    // gets the month
    var minutes = date.getMinutes();
    // gets AM/PM
    var ampm = hours >= 12 ? 'pm' : 'am';
    // converts hours to 12 hour instead of 24 hour
    hours = hours % 12;
    // converts 0 (midnight) to 12
    hours = hours ? hours : 12; // the hour '0' should be '12'
    // converts minutes to have leading 0
    minutes = minutes < 10 ? '0'+ minutes : minutes;
  
    // the time string
    var time = hours + ':' + minutes + ' ' + ampm;
  
    // gets the match for the date string we want
    var match = date.toString().match(/\w{3} \w{3} \d{1,2} \d{4}/);
  
    //the result
    return match[0] + ' ' + time;
} 
 
var storage	=	multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
	console.log(file.originalname);
	var date = new Date();
	var dtstr = date.toDateString();
	var time = date.toLocaleTimeString();
    var date_time_stamp = dtstr + ' ' + time;
	_objCourse['name'] =(((file.originalname).split('.')[0]).split('_')[1]);
	_objCourse['url'] = '../ngCourse/uploads/' + ((file.originalname).split('.')[0]);
	_objCourse['date_time_stamp'] = date_time_stamp;
	_objCourse['thumbnail'] = _objCourse['url']+'/thumbnails/1.jpg';
	fs.readFile(file1, 'utf8', function (err,data) {
		console.log("hi16");
	if (err) {
	  return console.log(err);
	}
	if(data!=null){
		if((JSON.stringify(data)).trim().length==2)
		{
			console.log("hi77::"+(JSON.stringify(data)).trim().length);
			data = data.replace('}{','},{');
			data = '['+data+']';
			data = data.replace('[[','[');
			data = data.replace('[\n[','[');
			data = data.replace(']]',']');
			data = data.replace(']\n]',']');
		}
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
		console.log("hi13");
		if (((req.file.originalname).split('.')[1])=='zip'){
			console.log("hi14");
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




  
