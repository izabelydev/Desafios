const finn = document.querySelector('.finn');
const pipe = document.querySelector('.pipe')

const jump = () => {
    finn.classList.add('jump');

    setTimeout(() => {
        finn.classList.remove('jump');
    }, 600);
}
 
const loop = setInterval(() => {



    const pipePosition = pipe.offsetLeft;
    const finnPosition = +window.getComputedStyle(finn).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && finnPosition < 80) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        finn.style.animation = 'none';
        finn.style.bottom = `${finnPosition}px`;

        finn.src = '/img/finn-chateado.png';
        finn.style.width = '100px';

        clearInterval(loop);
    }

}, 10);

document.addEventListener('keydown', jump);