var http = require('http');
let path = require('path');
let fs = require('fs');
let {parse} = require('querystring')
let html = path.join(path.dirname(process.mainModule.filename), 'html', 'index.html')


http.createServer(function (request, response) {
    if(request.method === 'GET'){
        response.writeHead(200, {"Content-Type" : "text/html"});
        let static = fs.createReadStream(html)
        static.on('error', () => {
            response.writeHead(404);
            response.end()
        })
        static.pipe(response)
       
    }else if(request.method === 'POST'){
        let body = ''
        request.on('data', chunck => body += chunck.toString())
        request.on('end', () => {
            let parsed = parse(body)
            response.end(`hello ${parsed.name}`)
        })
    }
}).listen(8000);

console.log('Server running at http://127.0.0.1:8081/');