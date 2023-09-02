import { Details } from "./details.module.js"
import { Ui } from "./ui.module.js"

export class Foods{
    constructor(){
        this.getMeals('')
        this.navMainBtn=document.getElementById('nav-Main-btn')
        this.searchNme=document.getElementById('searchName')
        this.searchLetter=document.getElementById('searchLetter')
        this.nameINupt=document.getElementById('nameInupt')
        this.emailInupt=document.getElementById('emailInupt')
        this.phoneInupt=document.getElementById('phoneInupt')
        this.ageInupt=document.getElementById('ageInupt')
        this.passwordInupt=document.getElementById('passwordInupt')
        this.RepasswordInupt=document.getElementById('RepasswordInupt')
        // this.search=document.getElementById('Search')
        // this.categories=document.getElementById('Categories')
        // this.area=document.getElementById('Area')
        // this.Ingredients=document.getElementById('Ingredients')
        // this.contactUs=document.getElementById('Contact-Us')

        // this.navLi= document.querySelectorAll('li')
        // // this.navLi.forEach(e=>{
        // //     e.addEventListener('click',function(e){
        // //         if(e.target.dataset.category =='Search'){

        // //         }else if(e.target.dataset.category =='Contact-Us'){
                    
        // //         }else{
        // //             this.getMeals(e.target.dataset.category).bind(this)
        // //         }
        // //     })
        // // })

        // document.getElementById('main').addEventListener('click',function(e){
        //     console.log(e.target)
        // })

        $('li[data-category="categories"]').click(()=>this.getCategories())
        $('li[data-category="area"]').click(()=>this.getArea())
        $('li[data-category="ingredients"]').click(()=>this.getIngredients())
        $('li[data-category="search"]').click(()=>{
            this.closeNav()
            $('#Details').addClass('d-none')
            $('#ContactUs').addClass('d-none')
            $('#Search').removeClass('d-none')
            $('#main').removeClass('d-none')
            document.getElementById('main-Inner').innerHTML=''
            this.searchNme.addEventListener('keyup',()=>this.searchByName(this.searchNme.value));
            this.searchLetter.addEventListener('keyup',()=>this.searchByLetter(this.searchLetter.value))

        })
        $('li[data-category="contact-Us"]').click(()=>{
            this.closeNav()
            $('#Details').addClass('d-none')
            $('#Search').addClass('d-none')
            $('#main').addClass('d-none')
           $('#ContactUs').removeClass('d-none')
        })
        // $('li[data-category="categories"]').click((e)=>this.getCatAreIngre(e.target.dataset.category.charAt(0)))
        // $('li[data-category="area"]').click((e)=>this.getCatAreIngre(e.target.dataset.category.charAt(0)))
        
        // ===========================================ContactUsInpouts=====================
        this.nameINupt.addEventListener('keyup',()=>this.validateNameInput(this.nameINupt.value));
        this.emailInupt.addEventListener('keyup',()=>this.validateEmailInput(this.emailInupt.value));
        this.phoneInupt.addEventListener('keyup',()=>this.validatePhoneInput(this.phoneInupt.value));
        this.ageInupt.addEventListener('change',()=>this.validateAgeInput(this.ageInupt.value));
        this.ageInupt.addEventListener('keyup',()=>this.validateAgeInput(this.ageInupt.value));
        this.passwordInupt.addEventListener('keyup',()=>this.validatePasswoedInput(this.passwordInupt.value,this.RepasswordInupt.value));
        this.RepasswordInupt.addEventListener('keyup',()=>this.validateRepasswordInput(this.RepasswordInupt.value,this.passwordInupt.value));
        // ================================================================

        this.navMainBtn.addEventListener('click',function(){
            const navContentWidth =$('#nav-content').outerWidth(true)
            const navleft =$('nav').css("left")
            this.navleft=navleft

            if(navleft<"0px"){
                for(let i=1 ;i<=5;i++){
                    $(`li:nth-child(${i})`).animate({top:'0'},400+i*100)
                   }
                this.classList.replace('fa-bars','fa-x')
                $('nav').animate({left:"0"})
            }else{
                $('nav li').animate({top:'100%'})
                this.classList.replace('fa-x','fa-bars')
                $('nav').animate({left:`${-navContentWidth}`})
            }
            
        })
         this.ui=new Ui   

    }

    async getMeals(cat){
        $('.loading-screen-frist').fadeIn().css('z-index','999');
        const api= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${cat}`);
        const response= await api.json()
        console.log(response.meals)
        this.ui.displayRandome20Meal(response.meals)  
        this.startEvent('')  

        $('.loading-screen-frist').fadeOut(function(){
            $('.loading-screen-frist').remove() 
        });

    }
    async getCatMeal(cat){
        this.closeNav()
        $('.loading-screen').addClass('d-flex').fadeIn()

        const api= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`);
        const response= await api.json()
        console.log(response.meals)
        this.ui.displayRandome20Meal(response.meals)  
        this.startEvent()  
        $('.loading-screen').fadeOut(function(){
            $('.loading-screen').removeClass('d-flex')
        })
    }
    
    async getAreaMeal(cat){

        this.closeNav()
        $('.loading-screen').addClass('d-flex').fadeIn()
        const api= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${cat}`);
        const response= await api.json()
        console.log(response.meals)
        this.ui.displayRandome20Meal(response.meals)  
        this.startEvent()  
        $('.loading-screen').fadeOut(function(){
            $('.loading-screen').removeClass('d-flex')
        })

    }
    async getIngaMeal(cat){
        this.closeNav()
        $('.loading-screen').addClass('d-flex').fadeIn()
        const api= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${cat}`);
        const response= await api.json()
        console.log(response.meals)
        this.ui.displayRandome20Meal(response.meals)  
        this.startEvent()  
        $('.loading-screen').fadeOut(function(){
            $('.loading-screen').removeClass('d-flex')
        })

    }

    async getCategories(){
        this.closeNav()
        // document.querySelector('.loading-screen').classList.replace('d-none','d-flex')
        $('#Details').addClass('d-none')
        $('#ContactUs').addClass('d-none')
        $('#Search').addClass('d-none')
        $('.loading-screen').addClass('d-flex').fadeIn()

        const api= await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
        const response= await api.json()
        this.ui.displaycategories(response.categories)    
        this.startMinueCatEvent()
        $('.loading-screen').fadeOut(function(){
            $('.loading-screen').removeClass('d-flex')
        })

    }
    async getArea(){
        this.closeNav()
        $('#Details').addClass('d-none')
        $('#ContactUs').addClass('d-none')
        $('#Search').addClass('d-none')
                $('.loading-screen').addClass('d-flex').fadeIn()
        const api= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
        const response= await api.json()
        this.ui.displayArea(response.meals) 
        this.startMinueAreaEvent()       
        $('.loading-screen').fadeOut(function(){
            $('.loading-screen').removeClass('d-flex')
        })   
    }
    async getIngredients(){
        this.closeNav()
        $('#Details').addClass('d-none')

        $('#ContactUs').addClass('d-none')

        $('#Search').addClass('d-none')
                $('.loading-screen').addClass('d-flex').fadeIn()
        const api= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
        const response= await api.json()
        this.ui.displayIngredients(response.meals) 
        this.startMinueIngEvent()       
        $('.loading-screen').fadeOut(function(){
            $('.loading-screen').removeClass('d-flex')
        })  
    }
    async searchByName(mealName){
        
        $('.loading-screen').addClass('d-flex').fadeIn()
        if(mealName!=''){
        const api= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
        const response= await api.json()
        if(response.meals!=null){
        this.ui.displayNameSearchDate(response.meals) 
        this.startEvent()
        }else{
            document.getElementById('main-Inner').innerHTML=''
        }
        }else{
            document.getElementById('main-Inner').innerHTML=''
        }
        $('.loading-screen').fadeOut(function(){
            $('.loading-screen').removeClass('d-flex')
        })
    }
    async searchByLetter(Letter){
        
        $('.loading-screen').addClass('d-flex').fadeIn()
        if(mealName!=''){
        const api= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${Letter}`);
        const response= await api.json()
        if(response.meals!=null){
        this.ui.displayNameSearchDate(response.meals) 
        this.startEvent()
        }else{
            document.getElementById('main-Inner').innerHTML=''
        }
        }else{
            document.getElementById('main-Inner').innerHTML=''
        }
        $('.loading-screen').fadeOut(function(){
            $('.loading-screen').removeClass('d-flex')
        })
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

        console.log(age)    
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
        console.log(onOrOff)
        break
    }   
   }
   console.log(onOrOff)
   if(onOrOff){
    document.querySelector('button').removeAttribute('disabled')
   }else{
    document.querySelector('button').setAttribute('disabled','true')

}
    }
    startEvent(){

        document.querySelectorAll('.meal').forEach((e)=>{
            e.addEventListener('click' ,()=>this.showDetails(e.dataset.meal))
        }) 

    }
    startMinueCatEvent(){
        document.querySelectorAll('.categorymeal').forEach((e)=>{
            e.addEventListener('click' ,()=>
                this.getCatMeal (e.dataset.categorymeal))
        }) 
    }
    startMinueAreaEvent(){
        document.querySelectorAll('.categorymeal').forEach((e)=>{
            e.addEventListener('click' ,()=>
               this.getAreaMeal(e.dataset.categorymeal))
        }) 
    }
    startMinueIngEvent(){
        document.querySelectorAll('.categorymeal').forEach((e)=>{
            e.addEventListener('click' ,()=>
            this.getIngaMeal(e.dataset.categorymeal))
        }) 
    }
    showDetails(id){
        $('.loading-screen').addClass('d-flex').fadeIn()
        this.closeNav()
       const details= new Details(id);
       $('.loading-screen').fadeOut(function(){
        $('.loading-screen').removeClass('d-flex')
    })
    }
    closeNav(){
        let navleft =$('nav').css("left")
        console.log(navleft)
        if(navleft=="0px"){
            this.navMainBtn.click()
        }
    }
}
