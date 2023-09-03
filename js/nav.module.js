export class NavBar{

    constructor(){
        this.navMainBtn=document.getElementById('nav-Main-btn')

        this.navMainBtn.addEventListener('click',function(){
            const navContentWidth =$('#nav-content').outerWidth(true)
            const navleft =$('nav').css("left")
            
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
    }
    closeNav(){
        const navMainBtn=document.getElementById('nav-Main-btn')
        let navleft =$('nav').css("left")
        if(navleft=="0px"){
            navMainBtn.click()
        }
    }
}