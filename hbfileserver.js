//vim: filetype=js:sts=2:ts=2:sw=2:et:

var libhttp = require("http");
var libopt = require("getopt");
var libstatic = require("node-static");
var liburl = require("url");

var DEFAULTS = { 
	PORT:8080,       /* default port, unless overridden via cmdline option -p */
	ROOT:"./Public", /* default file serving directory unless overriden via -d */ 
};

var PORT=DEFAULTS.PORT;
var ROOT=DEFAULTS.ROOT;

/// hbfileserver.js -p <port> -d <hosting_directory_root>
try {
	libopt.setopt("p:d:", process.argv.slice(2));
} catch (e) {
	// exceptions are thrown when an invalid option
	// is set or a required parameter is not set
	console.dir(e);
}
libopt.getopt(function (o, p) {
	switch (o) {
		case "p":
			PORT=p-0;
			break;
		case "d":
			ROOT=p[0]; 	
			break;
	}
});


// node-static server instance to serve the ROOT folder
var filesrv = new libstatic.Server(ROOT);
//var putsrv = new libput.Server(ROOT);

/// DOC: https://nodejs.org/api/http.html#http_http_createserver_options_requestlistener 
libhttp.createServer(function (/*http.IncomingMessage:*/ request, response) {
    request.addListener('end', function () {
		console.log("LOG|....|Serving %s", liburl.parse(request.url).pathname); 
		
		/* 0 if fetch, 1 if push, -1 if neither */
		function getRequestDisposition(request){
			var m = request.method;
			if(m == "GET" || m == "HEAD"){
				return 0;
			}else if(m == "PUT"){
				return 1;
			}else{
				return -1;
			}
		}
		function fsmapper(rootfs){
			var cleanroot=clean(rootfs);
		}
		function getRequestParts(request){
			return { 
				disposition: getRequestDisposition(request),
				vpath: /*virtualpath*/ liburl.parse(request.url).pathname,
				rpath: /*realpath*/ null,
			};
		}
		if(0 == getRequestDisposition(request)){
			// Serve files! 
			filesrv.serve(request, response);
		}
    }).resume();
}).listen(PORT); 
console.log("DBG|....|Listening on %d serving at %s", PORT, ROOT);
