const TicketList = require("./ticket-list");

class Sockets {
  constructor(io) {
    this.io = io;
    //to create new Ticket
    this.TicketList = new TicketList();
    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", (socket) => {
      socket.on("solicitar-ticket", (data, callback) => {
        const newTicket = this.TicketList.createTicket();
        callback(newTicket);
        // this.io.emit("test-message-from-server", newTicket);
      });

      socket.on("siguiente-ticket", (usuario, callback) => {
        const { agente, escritorio } = usuario;
        const suTicket = this.TicketList.asignarTicket(agente, escritorio);
        callback(suTicket);
        this.io.emit("tickets-asignados", this.TicketList.ultimos13);
      });
    });
  }
}

module.exports = Sockets;
