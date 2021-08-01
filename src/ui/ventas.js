const pagVentas = document.querySelector('#ventas');
const mostrarDia = document.querySelector('#viewDay')
const search = document.querySelector('#search')
const datesearch = document.querySelector('#datesearch')
const { ipcRenderer, remote } = require('electron');

// VENTANA DE VENTAS

function renderVentas(fechas, b) {
    mostrarDia.innerHTML = '';
    pagVentas.innerHTML = '';

    // console.log(typeof (a));

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

ipcRenderer.on('get-dates', (e, args, b) => {
    const dates = JSON.parse(args)
    // fechas = datesReceived;
    renderVentas(dates, b)
});
