const caixa = document.querySelector('.caixa');
const loginLink = document.querySelector('.link-entrar');
const registerLink = document.querySelector('.link-registrar');
const btLogin = document.querySelector('.bt-login');
const iconeFechar = document.querySelector('.icone-fechar');

registerLink.addEventListener('click', ()=> {
    caixa.classList.add('active');
});

loginLink.addEventListener('click', ()=> {
    caixa.classList.remove('active');
});

btLogin.addEventListener('click', ()=> {
    caixa.classList.add('active-popup');
});

iconeFechar.addEventListener('click', ()=> {
    caixa.classList.remove('active-popup');
});