// Servidor de Express
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const cors = require("cors");

const Sockets = require("./sockets");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Http server
    this.server = http.createServer(this.app);

    // Configuraciones de sockets
    this.io = socketio(this.server, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
      },
    });
    //inicializar sockets, (antes estaba dentro de  configurarSockets() {} lo movimso para aca para poder usarlo en el servicio REST this.app.get('/ultimos'
    this.socketio = new Sockets(this.io);
  }

  middlewares() {
    // Desplegar el directorio público
    this.app.use(express.static(path.resolve(__dirname, "../public")));

    //vamos a crear un SERVICIO REST conetcnadose a sokcets para obtener los tickets actuales, los test con postman
    this.app.get("/ultimos", (req, res) => {
      //esta shit eran los cors en el header que me estaba pidiendo
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET");
      res.json({
        ok: true,
        ultimos: this.socketio.TicketList.ultimos13,
      });
    });

    // CORS
    this.app.use(
      cors({
        //el asterisco significa que estoy permitiendo que cualquier red se conecte a esta web
        origin: "*",
        methods: "GET,POST",
        credentials: true,
      })
    );
  }

  //este execute(){} es cuando hagas el npm run dev todo lo que esta dentro de execute() se va a ir ejecutando de manera asincrona
  execute() {
    // Inicializar Middlewares
    this.middlewares();

    // Inicializar sockets
    // this.configurarSockets();

    // Inicializar Server
    this.server.listen(this.port, () => {
      console.log("Server corriendo en puerto:", this.port);
    });
  }
}

module.exports = Server;
