import { Details } from "./details.module.js";
import { NavBar } from "./nav.module.js";
import { Ui } from "./ui.module.js";

export class Api{
    constructor(){
        this.getMeals('')

        this.nav= new NavBar;
        this.ui=new Ui;
        this.searchNme=document.getElementById('searchName')
        this.searchLetter=document.getElementById('searchLetter')

        
        $('li[data-categories="categories"]').click(()=>this.getCategories('c'))
        $('li[data-area="area"]').click(()=>this.getArea('a'))
        $('li[data-ingredients="ingredients"]').click(()=>this.getIngredients('i'))
        $('li[data-search="search"]').click(()=>{
            this.nav.closeNav()
            $('#Details').addClass('d-none')
            $('#ContactUs').addClass('d-none')
            $('#Search').removeClass('d-none')
            $('#main').removeClass('d-none')
            document.getElementById('main-Inner').innerHTML=''
            this.searchNme.addEventListener('keyup',()=>this.searchByName(this.searchNme.value));
            this.searchLetter.addEventListener('keyup',()=>this.searchByLetter(this.searchLetter.value))
        })
        $('li[data-contactus="contact-Us"]').click(()=>{
            this.nav.closeNav()
            $('#Details').addClass('d-none')
            $('#Search').addClass('d-none')
            $('#main').addClass('d-none')
           $('#ContactUs').removeClass('d-none')
        })

    }
    async getMeals(meal){ 
        $('.loading-screen-frist').fadeIn().css('z-index','999');
        const api= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`);
        const response= await api.json()
        this.ui.displayMeals(response.meals)  
        this.startEvent('')  

        $('.loading-screen-frist').fadeOut(function(){
            $('.loading-screen-frist').remove() 
        });
        this.nav.closeNav()

    }
    async filtterMeals(filteraApiLatter,cat,closeNave,ui,event,details){
        closeNave()
        $('.loading-screen').addClass('d-flex').fadeIn()

        const api= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?${filteraApiLatter}=${cat}`);
        const response= await api.json()
        ui(response.meals)  
        event(details,closeNave) 
        $('.loading-screen').fadeOut(function(){
            $('.loading-screen').removeClass('d-flex')
        })
    }
    
    async getCategories(filteraApiLatter){
        this.nav.closeNav()
        // document.querySelector('.loading-screen').classList.replace('d-none','d-flex')
        $('#Details').addClass('d-none')
        $('#ContactUs').addClass('d-none')
        $('#Search').addClass('d-none')
        $('.loading-screen').addClass('d-flex').fadeIn()

        const api= await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
        const response= await api.json()
        this.ui.displaycategories(response.categories)    
        this.startMinueEvent(this.filtterMeals,filteraApiLatter)
        $('.loading-screen').fadeOut(function(){
            $('.loading-screen').removeClass('d-flex')
        })

    }
    async getArea(filteraApiLatter){
        this.nav.closeNav()
        $('#Details').addClass('d-none')
        $('#ContactUs').addClass('d-none')
        $('#Search').addClass('d-none')
                $('.loading-screen').addClass('d-flex').fadeIn()
        const api= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
        const response= await api.json()
        this.ui.displayArea(response.meals) 
        this.startMinueEvent(this.filtterMeals,filteraApiLatter)
        $('.loading-screen').fadeOut(function(){
            $('.loading-screen').removeClass('d-flex')
        })   
    }
    async getIngredients(filteraApiLatter){
        this.nav.closeNav()
        $('#Details').addClass('d-none')

        $('#ContactUs').addClass('d-none')

        $('#Search').addClass('d-none')
                $('.loading-screen').addClass('d-flex').fadeIn()
        const api= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
        const response= await api.json()
        this.ui.displayIngredients(response.meals) 
        this.startMinueEvent(this.filtterMeals,filteraApiLatter)
        $('.loading-screen').fadeOut(function(){
            $('.loading-screen').removeClass('d-flex')
        })  
    }
    async searchByName(mealName){
        
        if(!document.querySelector('.loading-screen').classList.contains('d-flex')){
            $('.loading-screen').addClass('d-flex').fadeIn()
        }
        if(mealName!=null){
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
        if(Letter==''){
            Letter='a'
        }
        if(!document.querySelector('.loading-screen').classList.contains('d-flex')){
            $('.loading-screen').addClass('d-flex').fadeIn()
        }
        if(Letter!=null){
            
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
    startEvent(details,closeNave){
        if(details){
            document.querySelectorAll('.meal').forEach((e)=>{
                e.addEventListener('click' ,()=>details(e.dataset.meal,closeNave))
            }) 
        }else{        document.querySelectorAll('.meal').forEach((e)=>{
            e.addEventListener('click' ,()=>this.showDetails(e.dataset.meal))
        }) 
}

    }
    startMinueEvent(s,filteraApiLatter){
        document.querySelectorAll('.categorymeal').forEach((e)=>{
            e.addEventListener('click' ,()=>
                s(filteraApiLatter,e.dataset.catvalue, this.nav.closeNav,this.ui.displayMeals,this.startEvent,this.showDetails))
        }) 
    }
    showDetails(id,closeNave){
        if(closeNave){
            closeNave()  
        }else{
            this.nav.closeNav()
        }
       const details= new Details(id);

    }
}