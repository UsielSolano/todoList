const tarea = document.getElementById('tarea');
const enter = document.getElementById('enter');
const container__todo = document.querySelector('.container__todo');
let tareas = {
}
/**
 * Evento para escuchar el click 
 */
enter.addEventListener('click', (e) => {
    createElement(tarea.value);
    tarea.value = "";
})
/**
 * Evento para escuchar el boton de enter
 */
tarea.addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
        createElement(tarea.value)
        tarea.value = "";
    }
})
/**
 * @param {*} idTarea 
 * @param {*} tarea 
 * @param {*} isDelete 
 */
function saveLS(idTarea, tarea, isDelete) {
    if (isDelete) {
        delete tareas[idTarea]
    } else {
        tareas[idTarea] = tarea
    }
    let tareaLS = JSON.stringify(tareas)
    window.localStorage.setItem('Tareas', tareaLS);
    saveRemote(tareaLS)
}
/**
 * Local storage help to keep data on local save
 * this function save data in local storage and  create element too
 */
async function extraerLS() {
    //notification alow to user know if there is data in local storage
    Notification.requestPermission().then(function (result) {
        console.log('Usiel solano', result);
       
    });
    //get data from local storage
    tareas = JSON.parse(window.localStorage.getItem('Tareas'));
    if (!tareas) {
        tareas = {};
    }
    Object.entries(tareas).forEach(([idTarea, tarea]) => {
        createElement(tarea, idTarea, false);

    })
    const datoremote = await getRemote();
    Object.entries(datoremote).forEach(([idTarea, tarea]) => {
        if (!tareas[idTarea]) {
            tareas[idTarea] = tarea;
            createElement(tarea, idTarea, false);
        }
    })
    saveRemote(JSON.stringify(tareas));
    // let tareaLS = JSON.stringify(tareas)
    // window.localStorage.setItem('Tareas', tareaLS);

}
/**
 * inseta c�digo HTML declarado en un String template y lo inserta en el contenedor de las tareas 
 * como el hijo declarado con el (afterbegin,afterend,beforebegin, beforeend);}
 * @param {string} tarea 
 * 
 * @returns 
 */
function createElement(tarea, idTarea, isSave = true) {
    if (!tarea) {
        alert('se recomienda llenar los datos');
        return
    }
    if (!idTarea) {
        idTarea = Date.now();
    }
    const contenedor = `
    <div class="container__todo_tarea" data-idTarea="${idTarea}">
        <!--<input type="checkbox">-->
        <input class="nuevotexto" type="text" readonly value="${tarea}">
        <button onclick="handleActions('delete','${idTarea}')" action="delete" >Delete</button>
        <button onclick="handleActions('edit','${idTarea}')" action="edit">Edit</button>
        <button onclick="handleActions('done','${idTarea}')" hidden action="done">Done</button>
        </div>`;
    container__todo.insertAdjacentHTML("afterbegin", contenedor);
    if (isSave) {
        saveLS(idTarea, tarea);
    }
}

/**
 * 
 * @param {string} button 
 * @param {string} idTarea
 * @param {HTMLElement} button
 * @param {HTMLElement} action 
 * help to get action from html tags especify here the button tag
 *  
 */

function handleActions(action, idTarea) {
    if (action == 'delete') {
        container__todo.querySelector(`.container__todo_tarea[data-idTarea='${idTarea}']`).remove();
        delete tareas[idTarea];
        saveLS(idTarea, null, true)

    } else if (action == 'edit') {
        container__todo.querySelector(`.container__todo_tarea[data-idTarea='${idTarea}']>button[action='edit']`).hidden = true;
        container__todo.querySelector(`.container__todo_tarea[data-idTarea='${idTarea}']>input`).removeAttribute('readonly');
        container__todo.querySelector(`.container__todo_tarea[data-idTarea='${idTarea}']>button[action='done']`).hidden = false;

    } else if (action == 'done') {
        const tareaNueva = container__todo.querySelector(`.container__todo_tarea[data-idTarea='${idTarea}']>input`);
        container__todo.querySelector(`.container__todo_tarea[data-idTarea='${idTarea}']>button[action='edit']`).hidden = false;
        tareaNueva.setAttribute('readonly', true);
        container__todo.querySelector(`.container__todo_tarea[data-idTarea='${idTarea}']>button[action='done']`).hidden = true;
        saveLS(idTarea, tareaNueva.value);
    }

}

/**
 * 
 * @param {string} tareaLS Es un objeto que se convirti� en steing para enviarlo al back 
 * 
 */
async function saveRemote(tareaLS) {
    const correo = document.getElementById("uCorreo").textContent.trim();
    const response = await fetch('https://sistemas.cruzperez.com/usiel/back.php', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            tareas: tareaLS,
            correo: correo
        })
    });
    console.log(await response.text());

}
/**
 * 
 * @returns get value string but converter to original format 
 */
async function getRemote() {
    const correo = document.getElementById("uCorreo").textContent.trim();
    const response = await fetch('./datos/' + correo)
    const str = await response.text();

    return JSON.parse(str);

}



// notification push 


extraerLS();