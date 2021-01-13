const form = document.querySelector('form');
const text = document.querySelector('input');
const msg = document.querySelector('#a1');

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    fetch(`/weather?address=${text.value}`).then(response =>{
        response.json().then( ({address,forecast,weather} ={}) =>{
            msg.textContent =  address + forecast + weather + " degree";
        })
    })
})