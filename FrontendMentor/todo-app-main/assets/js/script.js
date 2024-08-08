// Declaração de variáveis globais
const btnTheme = document.querySelector('.change-theme');
const secondBg = document.querySelector('.second-bg');
const tasks = document.querySelectorAll('.tasks');
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
    filtersBg.classList.add('dark');
    inputTxt.classList.add('dark');

    for (let i = 0; i < tasks.length; i++) {
        tasks[i].classList.add('dark');
    }

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

    for (let i = 0; i < tasks.length; i++) {
        tasks[i].classList.remove('dark');
    }

    for (let i = 0; i < taskBg.length; i++) {
        taskBg[i].classList.remove('dark');
    }

    for (let i = 0; i < btnFilter.length; i++) {
        btnFilter[i].classList.remove('dark');
    }
} // Fim animação mudar tema


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
    if (listOfTasks.length < 2) {
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
    li.setAttribute('class', 'task on todo');
    li.innerHTML = `
        <button type="button" class="btn-check">
            <img class="btn-check" src="./assets/images/icon-check.svg" alt="Check">
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

// Animação botão para checar tarefa
document.addEventListener('click', e => {
    const el = e.target;

    if (el.classList.contains('btn-check')) {
        const taskItem = el.closest('li.task');

        if (!taskItem) return;
        if(taskItem.classList.contains('completed')) {
            taskItem.classList.remove('completed');
        } else {
            taskItem.classList.toggle('completed');
        }
    }
    saveTasks();
});

// Capturar valor do input para criar a tarefa
btnTask.addEventListener('click', () => {
    if (!inputTask.value) return;
    createTask(inputTask.value);
});

inputTask.addEventListener('keypress', e => {
    if (e.keyCode === 13) {
        if (!inputTask.value) return;
        createTask(inputTask.value);
    }
});

// Filtrar as tarefas
btnFilter.forEach(button => {
    button.addEventListener('click', () => {
        btnFilter.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');
        filterTasks(filter);
    });
});

function filterTasks(filter) {
    const allTasks = document.querySelectorAll('.tasks li');
    
    allTasks.forEach(task => {
        switch (filter) {
            case 'task':
                task.style.display = 'flex';
                break;
            case 'todo':
                if (task.classList.contains('todo') && !task.classList.contains('completed')) {
                    task.style.display = 'flex';
                } else {
                    task.style.display = 'none';
                }
                break;
            case 'completed':
                if (task.classList.contains('completed')) {
                    task.style.display = 'flex';
                } else {
                    task.style.display = 'none';
                }
                break;
            default:
                task.style.display = 'flex';
        }
    });
}

// Remover a tarefa com o botão X
document.addEventListener('click', e => {
    const el = e.target;

    if (el.classList.contains('remove-task')) {
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
    if (confirmation) {
        allTasks.innerHTML = '';
        saveTasks();
    } else {
        return;
    }
});
