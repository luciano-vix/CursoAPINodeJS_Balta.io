'use strickt';
const app = require('../src/app');
const http = require('http');
const debug = require('debug')('teste01:server');

const port = 3000;
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onerror);
server.on('listening', onListening);

console.log("API rodando na porta " + port);


function onerror(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    switch(error.code) {
        case 'EACCES' :
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE' :
            console.error('bind + is already in use');  
            process.exit(1);
            break;
        default:
            throw error;      
    }    
}

function onListening() {
        const addr = server.address();
        const bind = typeof addr === 'string'
        ? 'Pipe ' + addr
        : 'port ' + addr.port;
        debug('Listening on ' + bind);   
    
}