const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    if (req.method === 'GET') {
        res.writeHead(200, {'Content-Type':'text/html'});
        fs.readFile('./views/index.html', (error, data) => {
            if(error){
                res.writeHead(404, {'Content-Type':'text/html'});
                res.write("Archivo no encontrado");
                res.end();
            }else{
                res.write(data);
                const timestamp = new Date().toISOString();
                const dataTexto= ` method: ${req.method} \n url: ${req.url}`+
                `\n timestamp: ${timestamp} \n response code: ${res.statusCode}`+
                `\n msj: ${res.statusMessage}\n\n`;
                fs.appendFile('./mycoolserver.log',dataTexto, (error) =>{
                    if(error){
                        console.log('error al escribir en el log de registros');
                    }
                });
                res.end();
            } 
        })
    }else{
        res.writeHead(405, {'Content-Type':'text/html'});
        res.write("metodo no permitido");
        res.end();
    }
}).listen(3000,()=>{
    console.log('server running on port: 3000');
});