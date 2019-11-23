
/** Module dependencies.*/
let app = require('../app');
let debug = require('debug')('back-end:server');
let http = require('http');
let RX_port = require('./services/RX_serialPort');
let TX_port = require('./services/TX_serialPort');
const config = require('../config/network');
const logColor = require('../src/untils/logColor');
const saveData = require('./services/farm').saveData;
const fakeData = require('./services/socket_data').farm;

/** Get port from environment and store in Express.*/
let port = normalizePort(process.env.PORT || config.port);
app.set('port', port);

let UID_DB = require('../config/seeds').gateway;

/** Create HTTP server.*/
let server = http.createServer(app);
const io = require('socket.io')(server);
// Khi nhận được dữ liệu từ port, phân tích dữ liệu, chuyển dữ liệu string sang object sau đó gửi 
// qua socket với Topic là "farm_" + result.sub_id
RX_port.parser.on('data', async function(data) { 
  if (data.substring(0, 9) === '+TEST: RX') {
    let convert_data = RX_port.hex_to_ascii(data.substring(11, data.length - 1));
    let result = RX_port.dataParse(convert_data);
    console.log(result.sub_id, result.T1);
    if(UID_DB.includes(result.sub_id)){
      // await saveData(data)
      io.sockets.emit("farm_"+result.sub_id, result);
    }
  }
});
// Khi có kết nối từ Client qua socket và nhận được dữ liệu từ Client với Topic "controller" 
// rồi sau đó gửi dữ liệu xuống port
io.on('connection', function (socket) {
    socket.on("controller", async function (data) {
      let command = data.id+data.status;
      console.log(command)
      await TX_port.transfer(command);
    });
    setInterval(function(){
        let data = fakeData();
        // console.log(data.sub_id)
        io.sockets.emit("farm_"+data.sub_id, data);
    },3000);
    socket.on("farm", async function(data){
      console.log(data)
      await saveData(data)
    })
});

/** Listen on provided port, on all network interfaces.*/
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/** Normalize a port into a number, string, or false.*/
function normalizePort(val) {
  let port = parseInt(val, 10);
  if (isNaN(port)) return val; // named pipe
  if (port >= 0) return port; // port number
  return false;
}

/** Event listener for HTTP server "error" event.*/
function onError(error) {
  if (error.syscall !== 'listen') throw error;
  let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/** Event listener for HTTP server "listening" event.*/
function onListening() {
  let addr = server.address();
  let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
  console.log('Listening on ' + logColor(`color:yellow${bind}`));
}

console.log(logColor(`color:pink
███████╗ █████╗ ██████╗ ███╗   ███╗
██╔════╝██╔══██╗██╔══██╗████╗ ████║
█████╗  ███████║██████╔╝██╔████╔██║
██╔══╝  ██╔══██║██╔══██╗██║╚██╔╝██║
██║     ██║  ██║██║  ██║██║ ╚═╝ ██║
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝
`));
