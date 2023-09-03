export class Validation {
    constructor(){
        this.nameINupt=document.getElementById('nameInupt')
        this.emailInupt=document.getElementById('emailInupt')
        this.phoneInupt=document.getElementById('phoneInupt')
        this.ageInupt=document.getElementById('ageInupt')
        this.passwordInupt=document.getElementById('passwordInupt')
        this.RepasswordInupt=document.getElementById('RepasswordInupt')

        this.nameINupt.addEventListener('keyup',()=>this.validateNameInput(this.nameINupt.value));
        this.emailInupt.addEventListener('keyup',()=>this.validateEmailInput(this.emailInupt.value));
        this.phoneInupt.addEventListener('keyup',()=>this.validatePhoneInput(this.phoneInupt.value));
        this.ageInupt.addEventListener('change',()=>this.validateAgeInput(this.ageInupt.value));
        this.ageInupt.addEventListener('keyup',()=>this.validateAgeInput(this.ageInupt.value));
        this.passwordInupt.addEventListener('keyup',()=>this.validatePasswoedInput(this.passwordInupt.value,this.RepasswordInupt.value));
        this.RepasswordInupt.addEventListener('keyup',()=>this.validateRepasswordInput(this.RepasswordInupt.value,this.passwordInupt.value));
       
    }

    validateNameInput(name){
        this.nameINupt.classList.add('is-invalid')
        if(name.length){
            this.nameINupt.classList.remove('is-invalid')    
        }else{
            this.nameINupt.classList.add('is-invalid')
        }
        this.disableBtn()

    }
    validateEmailInput(email){
        this.emailInupt.classList.add('is-invalid')

        function isValidEmail(emailex) {
            // Regular expression for basic email validation
            var pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            
            // Use the test() method to check if the email matches the pattern
            return pattern.test(emailex);
          }
        if(isValidEmail(email)){
            this.emailInupt.classList.remove('is-invalid')
        }else{
            this.emailInupt.classList.add('is-invalid')
        }
        this.disableBtn()

    }
    validatePhoneInput(phone){
        this.phoneInupt.classList.add('is-invalid')
            function isValidNumber(input) {
            // Regular expression to check if the input consists of only digits
            var digitPattern = /^\d+$/;
            
            // Check if the input is a string and has a length less than or equal to 10
            if (typeof input === 'string' && input.length >= 10) {
              // Use the test() method to check if it consists of only digits
              return digitPattern.test(input);
            }
            
            return false;
          }
            
        if(isValidNumber(phone)){
            this.phoneInupt.classList.remove('is-invalid')
        }else{
            this.phoneInupt.classList.add('is-invalid')
        }
        this.disableBtn()
    }
    validateAgeInput(age){
        this.ageInupt.classList.add('is-invalid')

        if(age.length){
            this.ageInupt.classList.remove('is-invalid')
        }else{
            this.ageInupt.classList.add('is-invalid')
        }
        this.disableBtn()

    }
    validatePasswoedInput(password,repassword){
        this.passwordInupt.classList.add('is-invalid')

        function isValidPassword(password) {
            // Check if the password has at least eight characters
            if (password.length < 8) {
              return false;
            }
            
            // Use regular expressions to check for at least one letter and one number
            var letterPattern = /[a-zA-Z]/;
            var numberPattern = /[0-9]/;
            
            if (letterPattern.test(password) && numberPattern.test(password)) {
              return true;
            }
            
            return false;
          }
        if( isValidPassword(password)){
            this.passwordInupt.classList.remove('is-invalid')
        }else{
            this.passwordInupt.classList.add('is-invalid')
        }
        this.validateRepasswordInput(repassword,password)
    }

    validateRepasswordInput(repassword,password){
        if(repassword==password){
            this.RepasswordInupt.classList.remove('is-invalid')
        }else{
            this.RepasswordInupt.classList.add('is-invalid')
        }
        this.disableBtn()
    }
    disableBtn(){
        let inputs= Array.from(document.querySelectorAll('#ContactUs input'))
        let onOrOff=true
        for(let i=0 ;i<inputs.length;i++){
         if(inputs[i].classList.contains('is-invalid')||
         !this.nameINupt.value||
         !this.emailInupt.value||
         !this.phoneInupt.value||
         !this.ageInupt.value||
         !this.passwordInupt.value||
         !this.RepasswordInupt.value){
             onOrOff=false
             break
         }   
        }
        if(onOrOff){
         document.querySelector('button').removeAttribute('disabled')
        }else{
         document.querySelector('button').setAttribute('disabled','true')
     
     }
         }
}