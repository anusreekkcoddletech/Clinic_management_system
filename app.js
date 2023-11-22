

var http = require('http');
var port = 8000;

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  
  res.write('Hello');
  res.end();
}).listen(port, function () {
  console.log("Server is running on http://localhost:"+ port+"\nAnusree" );
})

