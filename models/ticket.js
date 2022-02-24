//aqui instalamos el paquete generador de ids para poder controlar cada ticket recuerda yarn add uuid
const { v4: uuidv4 } = require("uuid");

class Ticket {
  //este number que estamos poniendo en el constructor sera el poarametro que tenemos que insertar cuando llamemos new Ticket(this.ultimoNumero);
  constructor(number) {
    this.id = uuidv4();
    this.number = number;
    this.escritorio = null;
    this.agente = null;
  }
}

module.exports = Ticket;
