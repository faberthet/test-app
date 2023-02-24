import { Article } from "./article";
import { Subsection } from "./subsection";

export class SectionChild {
    type!:string; //"article" ou "subsection"
    article?:Article;
    subSection?:Subsection;
}
