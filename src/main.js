const { BrowserWindow, ipcMain, Menu, app } = require('electron')

const Task = require('./models/Task')

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

module.exports = { createWindow };