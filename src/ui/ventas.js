const pagVentas = document.querySelector('#ventas');
const mostrarDia = document.querySelector('#viewDay');
const monto = document.querySelector('#monto')
const search = document.querySelector('#search')
const datesearch = document.querySelector('#datesearch')
const { ipcRenderer, remote } = require('electron');

// VENTANA DE VENTAS

function renderVentas(fechas, b, montoTot) {
    mostrarDia.innerHTML = '';
    pagVentas.innerHTML = '';

    // console.log(montoTot);

    if (b.substr(0, 3) === 'Sat') {
        mostrarDia.innerHTML = `<h1 id='dia'> VENTA DEL SABADO ${b.substr(5, 6)} </h1>`
    } else if (b.substr(0, 3) === 'Sun') {
        mostrarDia.innerHTML = `<h1 id='dia'> VENTA DEL DOMINGO ${b.substr(5, 6)}</h1>`
    } else if (b.substr(0, 3) === 'Fri') {
        mostrarDia.innerHTML = `<h1 id='dia'> VENTA DEL VIERNES ${b.substr(5, 6)}</h1>`
    } else if (b.substr(0, 3) === 'Thu') {
        mostrarDia.innerHTML = `<h1 id='dia'> VENTA DEL JUEVES ${b.substr(5, 6)}</h1>`
    } else if (b.substr(0, 3) === 'Wed') {
        mostrarDia.innerHTML = `<h1 id='dia'> VENTA DEL MIERCOLES ${b.substr(5, 6)}</h1>`
    } else if (b.substr(0, 3) === 'Tue') {
        mostrarDia.innerHTML = `<h1 id='dia'> VENTA DEL MARTES ${b.substr(5, 6)}</h1>`
    } else if (b.substr(0, 3) === 'Mon') {
        mostrarDia.innerHTML = `<h1 id='dia'> VENTA DEL LUNES ${b.substr(5, 6)}</h1>`
    }

    monto.innerHTML = `<h2> El MONTO VENDIDO ESTE DIA FUE DE: </h2> <h2 id='montotot'>${montoTot}</h2>`

    fechas.map(e => {

        pagVentas.innerHTML += `
            <li id= "container">
                <h3> ${e.name} </h3>
                <p> Cantidad vendida:</p> <span> ${e.cantidad}</span>
                <br>
                <p> Fecha:</p> <span id= 'fecha'>${JSON.stringify(e.date).substr(1, 10)}</span>
            </li>
        `;
    })
}

search.addEventListener('submit', e => {
    e.preventDefault();

    ipcRenderer.send('get-dates', datesearch.value);
})

ipcRenderer.on('get-dates', (e, args, b, monto) => {
    const dates = JSON.parse(args)
    montoTot = parseFloat(monto)
    // fechas = datesReceived;
    renderVentas(dates, b, montoTot)
});
