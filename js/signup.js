document.getElementById('submit').addEventListener('click', (e) => {
  e.preventDefault();
  console.log("masuk");
  const name = document.getElementById('name').value;
  const pw = document.getElementById('pw').value;
  const confirmPw = document.getElementById('confirm-pw').value;
  const date = new Date(document.getElementById('date').value);
  const year = date.getFullYear();
  const today = new Date().getFullYear();
  const gender = document.getElementById('gender').value;
  const tnc = document.getElementById('tnc').checked;
  const error = document.getElementById('error-msg')
  if(name===""){
    error.innerHTML = 'Fullname must be filled'
  }
  else if(name.length<5){
    error.innerHTML= 'Fullname must be at least 5 characters'
  }
  else if(validateName(name)===false){
    error.innerHTML = 'Fullname must be at least 2 words'
  }

  else if(pw===""){
    error.innerHTML = 'Password must be filled'
  }
  else if(pw.length<8){
    error.innerHTML= 'Password must be at least 8 characters'
  }
  else if(validatePw(pw)===false){
    error.innerHTML = 'Password must contain an uppercased letter'
  }

  else if(confirmPw !== pw){
    error.innerHTML = 'Password must be the same'
  }

  else if(date == "Invalid Date"){
    error.innerHTML = 'Date of birth must be filled'
  }
  else if(today-year<18){
    error.innerHTML = 'You must be 18 to sign up for an account'
  }

  else if (gender === '' || gender === 'Select Gender') {
    error.innerHTML = 'Gender must be valid'
  }

  else if(!tnc){
    error.innerHTML = 'You must agree to the terms and conditions'
  }
  else{
    window.location.href = '../html/movies.html'
  }
});

const validateName = (ipt) => {
  const words = ipt.split(' ');
  if (words.length >= 2) return true;
  else return false;
};
const validatePw = (ipt) =>{
  return /[A-Z]/.test(ipt)
}