import { Article } from "./article";
import { Subsection } from "./subsection";

export class Section {
    name!:string;
    child!:(Article|Subsection)[];
    
    // constructor(name:string,child:(Article|Subsection)[]){
    //     this.name=name;
    //     this.child=child;
    // }
}
