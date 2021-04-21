const productForm = document.querySelector('#product');
const productName = document.querySelector('#name');
const productPrice = document.querySelector('#price');
const productDescription = document.querySelector('#description');

const productEmpanadas = document.querySelector('#productEmpanada');
const productPizzas = document.querySelector('#productPizza');
const productSandwiches = document.querySelector('#productSandwiche');
const productPollos = document.querySelector('#productPollo');
const productLomos = document.querySelector('#productLomo');
const productMilanesas = document.querySelector('#productMilanesa');
const productTortillas = document.querySelector('#productTortilla');
const productGuarniciones = document.querySelector('#productGuarnicion');
const productPastas = document.querySelector('#productPasta');
const productBebidas = document.querySelector('#productBebida');
const productVinos = document.querySelector('#productVino');
const productCervezas = document.querySelector('#productCerveza');
const productTragos = document.querySelector('#productTrago');
const productPostres = document.querySelector('#productPostre');

const productSelect = document.getElementById('menu')

const { ipcRenderer, remote } = require('electron');

let tasks = [];

let updateStatus = false;
let idUpdate = ''

function deleteTask(id){
    const result = confirm('Esta seguro que desea eliminar este producto?')
    if (result){
        ipcRenderer.send('delete-task', id)
    }
    return;
    
}

// editar y completar el formulario
function updateTask(id){
    updateStatus = true;
    idUpdate = id;
    const task = tasks.find(i => i._id === id)
    productName.value = task.name;
    productPrice.value = task.price;
    productDescription.value = task.description
    productSelect.value = task.menu

}



var acum = 0
function addCant(id){
    saveId = id
    const cantid = document.getElementById(id).value
    var mult
    const result = confirm(`Esta seguro que desea sumar ${cantid} veces este producto?`)
    if (result){
        const task = tasks.find(i => {
            if(i._id === id){
                mult = i.price * cantid
                console.log(mult)
                acum = acum + mult
                document.getElementById("canTotal").innerHTML = acum; 
            }
            
        })
    }
    return;
   
     
}

function restCant(id){
    saveId = id
    const cantid = document.getElementById(id).value
    var mult
    const result = confirm(`Esta seguro que desea restar ${cantid} veces este producto?`)

    if (result){
        const task = tasks.find(i => {
            if(i._id === id){
                mult = i.price * cantid
                console.log(mult)
                acum = acum - mult
                document.getElementById("canTotal").innerHTML = acum; 
            }
            
        })
    }
    return;  
}

//Recorrer el arreglo y mostrar por la vista
    
function renderTasks(tasks){
    productEmpanadas.innerText ='';
    productPizzas.innerText ='';
    productSandwiches.innerText ='';
    productPollos.innerText ='';
    productLomos.innerText ='';
    productMilanesas.innerText ='';
    productTortillas.innerText ='';
    productGuarniciones.innerText ='';
    productPastas.innerText ='';
    productBebidas.innerText ='';
    productVinos.innerText ='';
    productCervezas.innerText ='';
    productTragos.innerText ='';
    productPostres.innerText ='';

   
    tasks.map(i => {
        //--------------------------------------------------
        let aidi = (i._id).toString()

        const input = document.createElement('input') 

        const pa = document.createElement('p')
        const p = document.createElement('p')
        const par = document.createElement('p')
        const parr = document.createElement('p')

        const button = document.createElement('button')
        const buton = document.createElement('button') 
        const boton = document.createElement('button') 
        const botton = document.createElement('button') 

        const div = document.createElement('div') 
        const li = document.createElement('li')

        //-----------------------------------
        if(i.menu === 'pizzas'){
            //dentro del div
            botton.innerText='Restar', botton.onclick= e=>{restCant(aidi)}
            button.innerText='Sumar', button.onclick= e=>{addCant(aidi)}
            input.placeholder='Cantidad', input.type="number", input.class="cantidad", input.id = aidi, input.min="0"
            
            //dentro del li
            p.innerText=("id: "+ i._id), p.id="idd"
            pa.innerText=("nombre: "+ i.name)
            par.innerText=("precio: "+ i.price)
            parr.innerText=("descripcion:"+ i.description)
    
            boton.innerText='Eliminar', boton.id="eliminar", boton.onclick= e => {deleteTask(i._id)}
            buton.innerText='Editar', buton.id="editar", buton.onclick= e=> {updateTask(i._id)}
    
            // ul - li - div
            div.append(botton, input, button), id="form-cant"
            li.append(p, pa, par, parr, div, buton, boton)
            li.id='listar'
            productPizzas.append(li)

        }else if(i.menu === 'empanadas'){
            //dentro del div
            botton.innerText='Restar'
            button.innerText='Sumar', button.onclick= e=>{addCant(aidi)}
            input.placeholder='Cantidad', input.type="number", input.class="cantidad", input.id = aidi, input.min="0"
            
            //dentro del li
            p.innerText=("id: "+ i._id), p.id="idd"
            pa.innerText=("nombre: "+ i.name)
            par.innerText=("precio: "+ i.price)
            parr.innerText=("descripcion:"+ i.description)
    
            boton.innerText='Eliminar', boton.id="eliminar", boton.onclick= e => {deleteTask(i._id)}
            buton.innerText='Editar', buton.id="editar", buton.onclick= e=> {updateTask(i._id)}
    
            // ul - li - div
            div.append(botton, input, button), id="form-cant"
            li.append(p, pa, par, parr, div, buton, boton)
            li.id='listar'
            productEmpanadas.append(li)

        }else if(i.menu === 'sandwiches'){
            //dentro del div
            botton.innerText='Restar'
            button.innerText='Sumar', button.onclick= e=>{addCant(aidi)}
            input.placeholder='Cantidad', input.type="number", input.class="cantidad", input.id = aidi, input.min="0"
            
            //dentro del li
            p.innerText=("id: "+ i._id), p.id="idd"
            pa.innerText=("nombre: "+ i.name)
            par.innerText=("precio: "+ i.price)
            parr.innerText=("descripcion:"+ i.description)
    
            boton.innerText='Eliminar', boton.id="eliminar", boton.onclick= e => {deleteTask(i._id)}
            buton.innerText='Editar', buton.id="editar", buton.onclick= e=> {updateTask(i._id)}
    
            // ul - li - div
            div.append(botton, input, button), id="form-cant"
            li.append(p, pa, par, parr, div, buton, boton)
            li.id='listar'
            productSandwiches.append(li)

        }else if(i.menu === 'pollos'){
            //dentro del div
            botton.innerText='Restar'
            button.innerText='Sumar', button.onclick= e=>{addCant(aidi)}
            input.placeholder='Cantidad', input.type="number", input.class="cantidad", input.id = aidi, input.min="0"
            
            //dentro del li
            p.innerText=("id: "+ i._id), p.id="idd"
            pa.innerText=("nombre: "+ i.name)
            par.innerText=("precio: "+ i.price)
            parr.innerText=("descripcion:"+ i.description)
    
            boton.innerText='Eliminar', boton.id="eliminar", boton.onclick= e => {deleteTask(i._id)}
            buton.innerText='Editar', buton.id="editar", buton.onclick= e=> {updateTask(i._id)}
    
            // ul - li - div
            div.append(botton, input, button), id="form-cant"
            li.append(p, pa, par, parr, div, buton, boton)
            li.id='listar'
            productPollos.append(li)

        }else if(i.menu === 'lomos'){
            //dentro del div
            botton.innerText='Restar'
            button.innerText='Sumar', button.onclick= e=>{addCant(aidi)}
            input.placeholder='Cantidad', input.type="number", input.class="cantidad", input.id = aidi, input.min="0"
            
            //dentro del li
            p.innerText=("id: "+ i._id), p.id="idd"
            pa.innerText=("nombre: "+ i.name)
            par.innerText=("precio: "+ i.price)
            parr.innerText=("descripcion:"+ i.description)
    
            boton.innerText='Eliminar', boton.id="eliminar", boton.onclick= e => {deleteTask(i._id)}
            buton.innerText='Editar', buton.id="editar", buton.onclick= e=> {updateTask(i._id)}
    
            // ul - li - div
            div.append(botton, input, button), id="form-cant"
            li.append(p, pa, par, parr, div, buton, boton)
            li.id='listar'
            productLomos.append(li)

        }else if(i.menu === 'milanesas'){
            //dentro del div
            botton.innerText='Restar'
            button.innerText='Sumar', button.onclick= e=>{addCant(aidi)}
            input.placeholder='Cantidad', input.type="number", input.class="cantidad", input.id = aidi, input.min="0"
            
            //dentro del li
            p.innerText=("id: "+ i._id), p.id="idd"
            pa.innerText=("nombre: "+ i.name)
            par.innerText=("precio: "+ i.price)
            parr.innerText=("descripcion:"+ i.description)
    
            boton.innerText='Eliminar', boton.id="eliminar", boton.onclick= e => {deleteTask(i._id)}
            buton.innerText='Editar', buton.id="editar", buton.onclick= e=> {updateTask(i._id)}
    
            // ul - li - div
            div.append(botton, input, button), id="form-cant"
            li.append(p, pa, par, parr, div, buton, boton)
            li.id='listar'
            productMilanesas.append(li)

        }else if(i.menu === 'tortillas'){
            //dentro del div
            botton.innerText='Restar'
            button.innerText='Sumar', button.onclick= e=>{addCant(aidi)}
            input.placeholder='Cantidad', input.type="number", input.class="cantidad", input.id = aidi, input.min="0"
            
            //dentro del li
            p.innerText=("id: "+ i._id), p.id="idd"
            pa.innerText=("nombre: "+ i.name)
            par.innerText=("precio: "+ i.price)
            parr.innerText=("descripcion:"+ i.description)
    
            boton.innerText='Eliminar', boton.id="eliminar", boton.onclick= e => {deleteTask(i._id)}
            buton.innerText='Editar', buton.id="editar", buton.onclick= e=> {updateTask(i._id)}
    
            // ul - li - div
            div.append(botton, input, button), id="form-cant"
            li.append(p, pa, par, parr, div, buton, boton)
            li.id='listar'
            productTortillas.append(li)

        }else if(i.menu === 'guarniciones'){
            //dentro del div
            botton.innerText='Restar'
            button.innerText='Sumar', button.onclick= e=>{addCant(aidi)}
            input.placeholder='Cantidad', input.type="number", input.class="cantidad", input.id = aidi, input.min="0"
            
            //dentro del li
            p.innerText=("id: "+ i._id), p.id="idd"
            pa.innerText=("nombre: "+ i.name)
            par.innerText=("precio: "+ i.price)
            parr.innerText=("descripcion:"+ i.description)
    
            boton.innerText='Eliminar', boton.id="eliminar", boton.onclick= e => {deleteTask(i._id)}
            buton.innerText='Editar', buton.id="editar", buton.onclick= e=> {updateTask(i._id)}
    
            // ul - li - div
            div.append(botton, input, button), id="form-cant"
            li.append(p, pa, par, parr, div, buton, boton)
            li.id='listar'
            productGuarniciones.append(li)

        }else if(i.menu === 'pastas'){
            //dentro del div
            botton.innerText='Restar'
            button.innerText='Sumar', button.onclick= e=>{addCant(aidi)}
            input.placeholder='Cantidad', input.type="number", input.class="cantidad", input.id = aidi, input.min="0"
            
            //dentro del li
            p.innerText=("id: "+ i._id), p.id="idd"
            pa.innerText=("nombre: "+ i.name)
            par.innerText=("precio: "+ i.price)
            parr.innerText=("descripcion:"+ i.description)
    
            boton.innerText='Eliminar', boton.id="eliminar", boton.onclick= e => {deleteTask(i._id)}
            buton.innerText='Editar', buton.id="editar", buton.onclick= e=> {updateTask(i._id)}
    
            // ul - li - div
            div.append(botton, input, button), id="form-cant"
            li.append(p, pa, par, parr, div, buton, boton)
            li.id='listar'
            productPastas.append(li)

        }else if(i.menu === 'bebidas'){
            //dentro del div
            botton.innerText='Restar'
            button.innerText='Sumar', button.onclick= e=>{addCant(aidi)}
            input.placeholder='Cantidad', input.type="number", input.class="cantidad", input.id = aidi, input.min="0"
            
            //dentro del li
            p.innerText=("id: "+ i._id), p.id="idd"
            pa.innerText=("nombre: "+ i.name)
            par.innerText=("precio: "+ i.price)
            parr.innerText=("descripcion:"+ i.description)
    
            boton.innerText='Eliminar', boton.id="eliminar", boton.onclick= e => {deleteTask(i._id)}
            buton.innerText='Editar', buton.id="editar", buton.onclick= e=> {updateTask(i._id)}
    
            // ul - li - div
            div.append(botton, input, button), id="form-cant"
            li.append(p, pa, par, parr, div, buton, boton)
            li.id='listar'
            productBebidas.append(li)

        }else if(i.menu === 'vinos'){
            //dentro del div
            botton.innerText='Restar'
            button.innerText='Sumar', button.onclick= e=>{addCant(aidi)}
            input.placeholder='Cantidad', input.type="number", input.class="cantidad", input.id = aidi, input.min="0"
            
            //dentro del li
            p.innerText=("id: "+ i._id), p.id="idd"
            pa.innerText=("nombre: "+ i.name)
            par.innerText=("precio: "+ i.price)
            parr.innerText=("descripcion:"+ i.description)
    
            boton.innerText='Eliminar', boton.id="eliminar", boton.onclick= e => {deleteTask(i._id)}
            buton.innerText='Editar', buton.id="editar", buton.onclick= e=> {updateTask(i._id)}
    
            // ul - li - div
            div.append(botton, input, button), id="form-cant"
            li.append(p, pa, par, parr, div, buton, boton)
            li.id='listar'
            productVinos.append(li)

        }else if(i.menu === 'cervezas'){
            //dentro del div
            botton.innerText='Restar'
            button.innerText='Sumar', button.onclick= e=>{addCant(aidi)}
            input.placeholder='Cantidad', input.type="number", input.class="cantidad", input.id = aidi, input.min="0"
            
            //dentro del li
            p.innerText=("id: "+ i._id), p.id="idd"
            pa.innerText=("nombre: "+ i.name)
            par.innerText=("precio: "+ i.price)
            parr.innerText=("descripcion:"+ i.description)
    
            boton.innerText='Eliminar', boton.id="eliminar", boton.onclick= e => {deleteTask(i._id)}
            buton.innerText='Editar', buton.id="editar", buton.onclick= e=> {updateTask(i._id)}
    
            // ul - li - div
            div.append(botton, input, button), id="form-cant"
            li.append(p, pa, par, parr, div, buton, boton)
            li.id='listar'
            productCervezas.append(li)

        }else if(i.menu === 'tragos'){
            //dentro del div
            botton.innerText='Restar'
            button.innerText='Sumar', button.onclick= e=>{addCant(aidi)}
            input.placeholder='Cantidad', input.type="number", input.class="cantidad", input.id = aidi, input.min="0"
            
            //dentro del li
            p.innerText=("id: "+ i._id), p.id="idd"
            pa.innerText=("nombre: "+ i.name)
            par.innerText=("precio: "+ i.price)
            parr.innerText=("descripcion:"+ i.description)
    
            boton.innerText='Eliminar', boton.id="eliminar", boton.onclick= e => {deleteTask(i._id)}
            buton.innerText='Editar', buton.id="editar", buton.onclick= e=> {updateTask(i._id)}
    
            // ul - li - div
            div.append(botton, input, button), id="form-cant"
            li.append(p, pa, par, parr, div, buton, boton)
            li.id='listar'
            productTragos.append(li)

        }else if(i.menu === 'postres'){
            //dentro del div
            botton.innerText='Restar'
            button.innerText='Sumar', button.onclick= e=>{addCant(aidi)}
            input.placeholder='Cantidad', input.type="number", input.class="cantidad", input.id = aidi, input.min="0"
            
            //dentro del li
            p.innerText=("id: "+ i._id), p.id="idd"
            pa.innerText=("nombre: "+ i.name)
            par.innerText=("precio: "+ i.price)
            parr.innerText=("descripcion:"+ i.description)
    
            boton.innerText='Eliminar', boton.id="eliminar", boton.onclick= e => {deleteTask(i._id)}
            buton.innerText='Editar', buton.id="editar", buton.onclick= e=> {updateTask(i._id)}
    
            // ul - li - div
            div.append(botton, input, button), id="form-cant"
            li.append(p, pa, par, parr, div, buton, boton)
            li.id='listar'
            productPostres.append(li)

        }
        
         
    })
  
}

//guardar el producto al ejecutar 'Guardar'
productForm.addEventListener('submit', e =>{
    e.preventDefault();

    const task = {
       name: productName.value,
       price: productPrice.value,
       description: productDescription.value,
       menu: productSelect.value

    }


   if (!updateStatus){
     ipcRenderer.send('new-task', task)
   }else {
       ipcRenderer.send('update-task', {...task, idUpdate} )
   }
    productForm.reset();
})

// cargar nuevo producto a la vista
ipcRenderer.on('new-task-create', (e, args) =>{
   const newTask = JSON.parse(args)
   tasks.push(newTask)
   renderTasks(tasks)
})

ipcRenderer.send('get-tasks');

ipcRenderer.on('get-tasks', (e, args)=>{
    const tasksReceived = JSON.parse(args)
    tasks = tasksReceived;
    renderTasks(tasksReceived)
});

//sacar de la vista a la tarea eliminada
ipcRenderer.on('delete-task-success', (e, args) => {
    const deleteTask = JSON.parse(args)
    const newTasks = tasks.filter(i => {
        return i._id !== deleteTask._id;
    })
    tasks = newTasks;
    renderTasks(tasks);
})

//Actualizar la vista con la tarea ya actualizada
ipcRenderer.on('update-task-success', (e, args)=>{
    const updatedTask = JSON.parse(args);
   tasks = tasks.map(i =>{
        if( i._id === updatedTask._id){
            i.name = updatedTask.name;
            i.price = updatedTask.price;
            i.description = updatedTask.description;
            i.menu = updateTask.menu
        }
        return i;
    })
    renderTasks(tasks)
})