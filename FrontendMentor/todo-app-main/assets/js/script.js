// Início animação mudar tema
const btnTheme = document.querySelector('.change-theme');

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

const secondBg = document.querySelector('.second-bg');
const allTasks = document.querySelector('.tasks');
const filtersBg = document.querySelector('.btn-filters');
const taskBg = document.querySelectorAll('.task');
const inputTxt = document.querySelector('.task-txt');
const btnFilter = document.querySelectorAll('.btn');
const isMobile = window.innerWidth < 575;

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
}

// Fim animação mudar tema

// Animação botão para checar tarefa

// Adicionar tarefas
const inputTask = document.querySelector('#task-input');
const btnTask = document.querySelector('.add-task');
// allTasks

function clearInput() {
    inputTask.value = '';
    inputTask.focus();
}

function createTask(txtInput) {
    const li = document.createElement('li');
    li.setAttribute('class', 'task off');
    li.innerHTML = `
        <button type="button" class="btn-check">
            <img src="./assets/images/check.svg" alt="Check icon">
        </button>
        <p class="task-txt">${txtInput}</p>
        <img src="./assets/images/close.svg" alt="Remove task"  class="remove-task">`;

    allTasks.appendChild(li);
    clearInput();

    setTimeout(() => {
        li.classList.remove('off');
        li.classList.add('on');
    }, 100);
}

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

document.addEventListener('click', e => {
    const el = e.target;

    if(el.classList.contains('remove-task')) {
        el.parentElement.classList.remove('on');
        el.parentElement.classList.add('off');
        setTimeout(() => {
            el.parentElement.remove();
        }, 200);
    }
});