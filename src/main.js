const { BrowserWindow, ipcMain, Menu, app } = require('electron')

const Task = require('./models/Task');
const Fecha = require('./models/Fechas');

let templateMenu = [
    {
        label: 'Archivo',
        submenu: [
            {
                label: 'Cerrar programa',
                accelerator: 'Ctrl+Q',
                click() {
                    app.quit()
                }
            }
        ]
    },
    {
        label: 'Ventas',
        submenu: [
            {
                label: 'Ventas anteriores',
                click() {
                    createVentas()
                }
            }
        ]

    },
    {
        label: 'DevTools',
        submenu: [
            {
                label: 'Show/Hide Dev Tools',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools()
                }
            },
            {
                role: 'reload'
            }
        ]
    }
]

function createWindow() {
    const win = new BrowserWindow({
        width: 1500,
        height: 700,
        icon: __dirname + './img/ibiza.ico',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    win.loadFile('src/index.html')
    let mainMenu = Menu.buildFromTemplate(templateMenu);
    win.setMenu(mainMenu);

    win.on('closed', () => {
        app.quit();
    })

}

function createVentas() {
    const winventa = new BrowserWindow({
        width: 1500,
        height: 700,
        icon: __dirname + './img/ibiza.ico',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    winventa.loadFile('src/ventas.html')
}

ipcMain.on('new-task', async (e, args) => {
    const newTask = new Task(args)
    const taskSaved = await newTask.save();
    e.reply('new-task-create', JSON.stringify(taskSaved));
})

ipcMain.on('get-tasks', async (e, args) => {
    const tasks = await Task.find();
    e.reply('get-tasks', JSON.stringify(tasks))

})

// Elminar un producto
ipcMain.on('delete-task', async (e, args) => {
    const taskDeleted = await Task.findByIdAndDelete(args);
    e.reply('delete-task-success', JSON.stringify(taskDeleted))
})

// Buscar la tarea a actualizar, actualizar y devolver la tarea actualizada
ipcMain.on('update-task', async (e, args) => {
    const updateTask = await Task.findByIdAndUpdate(
        args.idUpdate,
        {
            name: args.name,
            price: args.price,
            description: args.description,
            menu: args.menu
        }, { new: true })

    e.reply('update-task-success', JSON.stringify(updateTask))
})

// PESTAÑA DE VENTAS

//crear y guardar las ventas del finde
ipcMain.on('new-date', async (e, args) => {
    const existDate = await Fecha.findOne({ date: args.date, name: args.name })
    if (!existDate) {
        const newDate = new Fecha(args)
        await newDate.save();
    } else {
        const sum = parseFloat(args.cantidad) + existDate.cantidad;
        const updateDate = await Fecha.findByIdAndUpdate(
            existDate._id,
            {
                name: args.name,
                date: args.date,
                cantidad: sum
            }, { new: true }
        )
    }
})
ipcMain.on('rest-date', async (e, fecha) => {
    const existDate = await Fecha.findOne({ date: fecha.date, name: fecha.name })
    if (!existDate) {
        confirm('Este producto todavia no fue cargado')
    } else {
        const rest = existDate.cantidad - parseFloat(fecha.cantidad)
        await Fecha.findByIdAndUpdate(
            existDate._id,
            {
                name: fecha.name,
                date: fecha.date,
                cantidad: rest
            }, { new: true }
        )
    }
})

ipcMain.on('get-dates', async (e, args) => {
    const fechas = await Fecha.find({ date: args }).sort({ name: 1 });
    const oneFecha = await Fecha.findOne({ date: args })
    // console.log();
    const fec = oneFecha.date.toUTCString();
    e.reply('get-dates', JSON.stringify(fechas), fec)
})


module.exports = { createWindow, createVentas };