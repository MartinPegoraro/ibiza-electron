const pagVentas = document.querySelector('#ventas');
const mostrarDia = document.querySelector('#viewDay')
const search = document.querySelector('#search')
const datesearch = document.querySelector('#datesearch')
const { ipcRenderer, remote } = require('electron');

// VENTANA DE VENTAS



function renderVentas(fechas, b) {
    mostrarDia.innerHTML = '';
    pagVentas.innerHTML = '';


    if (b.substr(0, 3) === 'Sat') {
        mostrarDia.innerHTML = `<h1> VENTA DEL SABADO </h1>`
    } else if (b.substr(0, 3) === 'Sun') {
        mostrarDia.innerHTML = `<h1> VENTA DEL DOMINGO </h1>`
    } else if (b.substr(0, 3) === 'Fri') {
        mostrarDia.innerHTML = `<h1> VENTA DEL VIERNES </h1>`
    } else if (b.substr(0, 3) === 'Thu') {
        mostrarDia.innerHTML = `<h1> VENTA DEL JUEVES </h1>`
    } else if (b.substr(0, 3) === 'Wed') {
        mostrarDia.innerHTML = `<h1> VENTA DEL MIERCOLES </h1>`
    } else if (b.substr(0, 3) === 'Tue') {
        mostrarDia.innerHTML = `<h1> VENTA DEL MARTES </h1>`
    } else if (b.substr(0, 3) === 'Mon') {
        mostrarDia.innerHTML = `<h1> VENTA DEL LUNES </h1>`
    }





    fechas.map(e => {

        pagVentas.innerHTML += `
            <li id= "container">
                <p> Producto: ${e.name} </p>
                <p> Cantidad vendida: ${e.cantidad} </p>
                <span> Fecha: ${e.date} </span>
            </li>
        `;
    })
}

search.addEventListener('submit', e => {
    e.preventDefault();

    ipcRenderer.send('get-dates', datesearch.value);
})

ipcRenderer.on('get-dates', (e, args, b) => {
    console.log(b.substr(0, 3));
    const dates = JSON.parse(args)
    // fechas = datesReceived;
    renderVentas(dates, b)
});
