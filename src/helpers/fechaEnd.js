import moment from "moment/moment"



export const agregarIntervalo = (fecha, tipo, cantidad) => {
    // Parsea la fecha utilizando Moment.js
    const fechaMoment = moment(fecha);

    // Verifica el tipo y agrega el intervalo correspondiente
    if (tipo === 'M') {
        fechaMoment.add(cantidad, 'months');
    } else if (tipo === 'A') {
        fechaMoment.add(cantidad, 'years');
    } else {
        throw new Error('Tipo de intervalo no válido. Use "mes" o "año".');
    }

    // Retorna la nueva fecha como objeto Date
    return fechaMoment.toDate();
}