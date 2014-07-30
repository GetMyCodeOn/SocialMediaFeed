var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    twitter = require ('./module.js');

http.createServer(function (request, response){
  //function called from module.js
    twitter('foundersandcoders', function(err, res){
        console.log(res);

        fs.readFile('data.json', function (err, data) {
      response.writeHead(200, {"Content-Type": "text/json", 
                               "Access-Control-Allow-Origin": "*"})
      response.end(data)
    });
    });
}).listen(process.env.PORT); //8080 or process.env.PORT