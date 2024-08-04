// Declaração de variáveis globais
const btnTheme = document.querySelector('.change-theme');
const secondBg = document.querySelector('.second-bg');
const allTasks = document.querySelector('.tasks');
const filtersBg = document.querySelector('.btn-filters');
const inputTxt = document.querySelector('.task-txt');
const btnTask = document.querySelector('.add-task');
const inputTask = document.querySelector('#task-input');
const btnClearTasks = document.querySelector('.remove-all');
const btnFilter = document.querySelectorAll('.btn');
const taskBg = document.querySelectorAll('.task');
const isMobile = window.innerWidth < 575;

// Início animação mudar tema
btnTheme.addEventListener('click', () => {
    const imgTheme = document.querySelector('.theme-icon');

    if (imgTheme.classList.contains('moon')) {
        changeTheme('sun', 'icon-sun.svg', 'Sun');
        darkTheme();
    } else if (imgTheme.classList.contains('sun')) {
        changeTheme('moon', 'icon-moon.svg', 'Moon');
        lightTheme();
    }

    function changeTheme(newClass, newImg, newAlt) {
        btnTheme.classList.add('off');
        btnTheme.classList.remove('on');

        setTimeout(() => {
            imgTheme.setAttribute('class', `theme-icon ${newClass}`);
            imgTheme.setAttribute('src', `./assets/images/${newImg}`);
            imgTheme.setAttribute('alt', `${newAlt}`);

            btnTheme.classList.remove('off');
            btnTheme.classList.add('on');
        }, 500);
    }
});

function darkTheme() {
    secondBg.classList.add('dark');
    allTasks.classList.add('dark');
    filtersBg.classList.add('dark');
    inputTxt.classList.add('dark');

    for (let i = 0; i < taskBg.length; i++) {
        taskBg[i].classList.add('dark');
    }

    for (let i = 0; i < btnFilter.length; i++) {
        btnFilter[i].classList.add('dark');
    }
}

function lightTheme() {
    secondBg.classList.remove('dark');
    allTasks.classList.remove('dark');
    filtersBg.classList.remove('dark');
    inputTxt.classList.remove('dark');

    for (let i = 0; i < taskBg.length; i++) {
        taskBg[i].classList.remove('dark');
    }

    for (let i = 0; i < btnFilter.length; i++) {
        btnFilter[i].classList.remove('dark');
    }
} // Fim animação mudar tema

// Animação botão para checar tarefa (inserir essa função aqui)

// Salvar a tarefa no localStorage
function saveTasks() {
    const liTasks = allTasks.querySelectorAll('p');
    const listOfTasks = [];

    for (let taskTxt of liTasks) {
        listOfTasks.push(taskTxt.innerText);
    }
    const tasksJSON = JSON.stringify(listOfTasks);
    localStorage.setItem('tasks', tasksJSON);

    // Mostrar quantidade de tarefas
    const qttTasks = document.querySelector('.qtt-tasks');
    if(listOfTasks.length < 2) {
        qttTasks.innerText = `${listOfTasks.length} tarefa`;
    } else {
        qttTasks.innerText = `${listOfTasks.length} tarefas`;
    }
}

function addSaveTasks() {
    const tasks = localStorage.getItem('tasks');
    const listOfTasks = JSON.parse(tasks);
    
    for (let taskTxt of listOfTasks) {
        createTask(taskTxt);
    }
}
addSaveTasks(); // Fim salvar a tarefa no localStorage

function clearInput() {
    inputTask.value = '';
    inputTask.focus();
}

function createTask(txtInput) {
    const li = document.createElement('li');
    li.setAttribute('class', 'task off');
    li.innerHTML = `
        <button type="button" class="btn-check">
            <span class="material-symbols-outlined off">
                check
            </span>
        </button>
        <p class="task-txt">${txtInput}</p>
        <span class="material-symbols-outlined remove-task">
            close
        </span>`;

    allTasks.appendChild(li);
    clearInput();
    
    setTimeout(() => {
        li.classList.remove('off');
        li.classList.add('on');
    }, 100);

    saveTasks();
}

// Capturar valor do input para criar a tarefa
btnTask.addEventListener('click', () => {
    if (!inputTask.value) return;
    createTask(inputTask.value);
});

inputTask.addEventListener('keypress', e => {
    if(e.keyCode === 13) {
        if (!inputTask.value) return;
        createTask(inputTask.value);
    }
});

// Remover a tarefa com o botão X
document.addEventListener('click', e => {
    const el = e.target;

    if(el.classList.contains('remove-task')) {
        el.parentElement.classList.remove('on');
        el.parentElement.classList.add('off');
        setTimeout(() => {
            el.parentElement.remove();
            saveTasks();
        }, 200);
    }
});

// Apagar todas as tarefas
btnClearTasks.addEventListener('click', () => {
        const confirmation = confirm('Tem certeza? Não é possível desafazer essa ação');
        if(confirmation) {
            allTasks.innerHTML = '';
            saveTasks();
        } else {
            return;
        }
});