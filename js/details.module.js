import { Ui } from "./ui.module.js";

export class Details{
    constructor(id){
        $('.loading-screen').addClass('d-flex').fadeIn()

        console.log(id)
        this.ui=new Ui
        document.getElementById('main').classList.add('d-none')
        document.getElementById('Search').classList.add('d-none')
        document.getElementById('Details').classList.remove('d-none')
        this.getDeatils(id)
        $('.loading-screen').fadeOut(function(){
            $('.loading-screen').removeClass('d-flex')
        })
    }

    async getDeatils(id){
        console.log(id)
        $('.loading-screen').addClass('d-flex').fadeIn()
        const api= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${id}`);
        const response= await api.json()
        this.ui.displayDetails(response.meals[0])  
        $('.loading-screen').fadeOut(function(){
            $('.loading-screen').removeClass('d-flex')
        })
    }
}