import { SectionChild } from "./section-child";

export class Section {
    name!:string;
    children!:SectionChild[];
    
    // constructor(name:string,child:(Article|Subsection)[]){
    //     this.name=name;
    //     this.child=child;
    // }
}
