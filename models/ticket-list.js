const Ticket = require("./ticket");

class TicketList {
  constructor() {
    this.ultimoNumero = 0;
    this.pendientes = [];
    this.asignados = [];
  }

  get siguienteNumero() {
    this.ultimoNumero++;
    return this.ultimoNumero;
  }
  //vamos a obtener las 2 listas en pantalla los 3 que van en las tarjetas y los 113 en el historial
  get ultimos13() {
    return this.asignados.slice(0, 13);
  }
  createTicket() {
    const newTicket = new Ticket(this.ultimoNumero++);
    this.pendientes.push(newTicket);
    return newTicket;
  }

  asignarTicket(agente, escritorio) {
    if (this.pendientes.length === 0) {
      return null;
    }
    //con el shift retornamos el primer elemento del arreglo que es lo que queremos
    const siguienteTicket = this.pendientes.shift();
    siguienteTicket.agente = agente;
    siguienteTicket.escritorio = escritorio;
    //aqui insertamos el primer elemento del arreglo de this.pendientes al inicio del otro arreglo de asignados, o sea pasa de estar en la lista de pendientes a la lista de 3 que se estan atendiendo
    this.asignados.unshift(siguienteTicket);
    return siguienteTicket;
  }
}

module.exports = TicketList;
