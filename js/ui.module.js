export class Ui{
    displayRandome20Meal(resp){
       let container=``
        for(let i=0;i<resp.length;i++){
            if(i==20)break
            container+=`
            <div  class=" col-md-3 meal " data-meal="${resp[i].strMeal}">
            <div class="meal-img">
                 <div class="lyer-Img">
                <h3 class=" text-black ">${resp[i].strMeal}</h3>
            </div>
            <img src="${resp[i].strMealThumb}" alt="" class="w-100   ">
            </div>
        </div>  
            `
        }
        document.getElementById('main-Inner').innerHTML=container
        $('#main').removeClass('d-none')
    }
    displaycategories(resp){
        let container=``
         for(let i=0;i<resp.length;i++){
             if(i==20)break
             let descrip=this.spliter(resp[i].strCategoryDescription)

             container+=`
                 <div class=" col-md-3 categorymeal pointer-event  " data-categorymeal="${resp[i].strCategory}">
                 <div class="meal-img">
                      <div class="lyer-Img text-center flex-column justify-content-center">
                     <h3 class="text-black ">${resp[i].strCategory}</h3>
                     <p class="d-block text-black">${descrip}</p>
                     
                 </div>
                 <img src="${resp[i].strCategoryThumb}" alt="" class="w-100   ">
                 </div>
             </div>
             `
         }
         document.getElementById('main-Inner').innerHTML=container
         $('#main').removeClass('d-none')
     }
     displayArea(resp){
        let container=``
        for(let i=0;i<resp.length;i++){
            container+=`
            <div class=" col-md-3 categorymeal  " data-categorymeal="${resp[i].strArea}">
            <div class="text-center   ">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>${resp[i].strArea}</h3>
            </div>
            </div>
        `
    }
    document.getElementById('main-Inner').innerHTML=container
    $('#main').removeClass('d-none')
    }
    displayIngredients(resp){

        let container=``
        for(let i=0;i<resp.length;i++){
            if(i==20)break 
           let descrip=this.spliter(resp[i].strDescription)

            container+=`
            <div class=" col-md-3 categorymeal  " data-categorymeal="${resp[i].strIngredient}">
                <div class="text-center   ">
                    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    <h3>${resp[i].strIngredient}</h3>
                    <p>${descrip}</p>
                </div>
                </div>
        `
    }    
    document.getElementById('main-Inner').innerHTML=container
    $('#main').removeClass('d-none')
    }
    displayNameSearchDate(resp){
        let container=``

        for(let i=0;i<resp.length;i++){
            container+=`
                <div class=" col-md-3 meal " data-meal="${resp[i].strMeal}">
                <div class="meal-img">
                     <div class="lyer-Img">
                    <h3 class="text-black">${resp[i].strMeal}</h3>
                </div>
                <img src="${resp[i].strMealThumb}" alt="" class="w-100   ">
                </div>
            </div>
            `
        }

        document.getElementById('main-Inner').innerHTML=container
        $('#main').removeClass('d-none')
    }
   
    displayDetails(res){
        // console.log(
        //     res
        // )
        // console.log(res)
        // let resArr= Object.entries(res)
        // console.log(typeof(resArr));
        // let recpiceWord=[];
        // for(let i of resArr){
        //     console.log(i[1])
        //     recpiceWord.push(i[1])
        // }
        // let currntrecp=recpiceWord.slice(9,29)
        // let onlyRecp=[]
        // for(let i=0;i<currntrecp.length;i++){
        //     if(currntrecp[i]=='')break
        //     onlyRecp.push(currntrecp[i])
        // }
        // console.log(onlyRecp)
       const recpIngredient= this.backCurntRecpise(res,9,29)
       const recpamount= this.backCurntRecpise(res,30,49)
       const resultArray = recpamount.map((str, index) => str +' '+recpIngredient[index]);





        let recpContainer=''
        for(let i=0;i<resultArray.length;i++){
            recpContainer+=`
            <li class="alert alert-info m-2 p-1">${resultArray[i]}</li>
            `
        }
        let tagsFinal = [];
        let tagsContainer=''
        if(res.strTags!=null){
        let tags = res.strTags;
        const wordsArray = tags.split(',');
        for (const word of wordsArray) {
            tagsFinal.push(word)
        }
        }
        for(let i=0;i<tagsFinal.length;i++){
            tagsContainer+=`
            <li class="alert alert-danger m-2 p-1">${tagsFinal[i]}</li>
            `
        }


        let container =`
        <div class="container  vh-100 py-5 px-0 ">
        <div class="row justify-content-center align-items-center g-4 m-0">
            <div class="col-md-4 align-self-start pt-2  ">
                <footer>
                    <img src="${res.strMealThumb}" alt="" class="w-100 rounded-3">
                    <h2>${res.strMeal}</h2>
                </footer>
            </div>
            <div class="col-md-8">
                    <h2>Instructions</h2>
                    <p>${res.strInstructions}</p>
                    <h3><span class="fw-bolder">Area : </span>${res.strArea}</h3>
                    <h3><span class="fw-bolder">Category : </span>${res.strCategory}</h3>
                    <h3>Recipes :</h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">${recpContainer}</ul>
    
                    <h3>Tags :</h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">${tagsContainer}</ul>
    
                    <a target="_blank" href="${res.strSource}" class="btn btn-success">Source</a>
                    <a target="_blank" href="${res.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>
        </div>
    </div>`;

    
    document.getElementById('Details').innerHTML=container
    }

    backCurntRecpise(res,firstIndex,lastIndex){
        let resArr= Object.entries(res)
        let recpiceWord=[];
        for(let i of resArr){
            recpiceWord.push(i[1])
        }
        let currntrecp=recpiceWord.slice(firstIndex,lastIndex)
        let onlyRecp=[]
        for(let i=0;i<currntrecp.length;i++){
            if(currntrecp[i]==''||currntrecp[i]==' ')break
            onlyRecp.push(currntrecp[i])
        }
        return onlyRecp
    }
    spliter(strDescription){
        const words = strDescription.split(/\s+/);

        // Take the first 20 words
        const first20Words = words.slice(0, 20);
    
        // Join the selected words back into a single string
        const result = first20Words.join(' ');
    
        return result;
    }
}