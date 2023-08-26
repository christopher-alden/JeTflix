const element = document.getElementById("navbar");
window.addEventListener('scroll', () => {
const scrollPosition = window.scrollY;

if(scrollPosition > 100){
    element.style.backgroundColor = '#0f0f0f';
    element.style.transition = 'background 0.3s ease-in-out';
}
else{
    element.style.background = 'linear-gradient(0deg, rgba(238, 174, 202, 0) 0%, rgba(0, 0, 0, 1) 100%)';
    element.style.transition = 'background 0.5s ease-in-out';
}
});

const signUp = document.getElementById('sign-up')
signUp.addEventListener('click',()=>{
    window.location.href = '../html/signup.html'
})
const burger = document.getElementById('burger')
const dropdown = document.getElementById('drop')
burger.addEventListener('click',()=>{
    dropdown.classList.toggle('show')
    console.log("masuk");
})

