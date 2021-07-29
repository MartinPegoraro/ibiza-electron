const { createWindow, createVentas } = require('./main');
const { app } = require('electron')

require('./database')

app.whenReady().then(createWindow, createVentas)
// app.allowRendererProcessReuse = false