const btnTheme = document.querySelector('.change-theme');

btnTheme.addEventListener('click', () => {
    const imgTheme = document.querySelector('.theme-icon');

    if(imgTheme.classList.contains('moon')) {
        changeTheme('sun', 'icon-sun.svg', 'Sun');
        darkTheme();
    } else if(imgTheme.classList.contains('sun')) {
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
const allTasksBg = document.querySelector('.tasks');
const filtersBg = document.querySelector('.btn-filters');
const taskBg = document.querySelectorAll('.task');
const btnFilter = document.querySelectorAll('.btn');
const isMobile = window.innerWidth < 575;

function darkTheme() {
    secondBg.classList.add('dark');
    allTasksBg.classList.add('dark');
    filtersBg.classList.add('dark');

    for (let i = 0; i < taskBg.length; i++) {
        taskBg[i].classList.add('dark');
    }

    for (let i = 0; i < btnFilter.length; i++) {
        btnFilter[i].classList.add('dark');
    }
}

function lightTheme() {
    secondBg.classList.remove('dark');
    allTasksBg.classList.remove('dark');
    filtersBg.classList.remove('dark');

    for (let i = 0; i < taskBg.length; i++) {
        taskBg[i].classList.remove('dark');
    }

    for (let i = 0; i < btnFilter.length; i++) {
        btnFilter[i].classList.remove('dark');
    }
}
