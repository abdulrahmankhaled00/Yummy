import { Api } from "./api.module.js"
import { Details } from "./details.module.js"
import { NavBar } from "./nav.module.js"
import { Ui } from "./ui.module.js"
import { Validation } from "./validation.module.js"

export class Foods{
    constructor(){ 
        this.nav=new NavBar;
        this.ui=new Ui;
        this.validation= new Validation;
        this.api=new Api;
     }
}
