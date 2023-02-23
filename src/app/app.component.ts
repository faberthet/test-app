import { Component, OnInit } from '@angular/core';
import { Article } from './models/article';
import { Section } from './models/section';
import { Subsection } from './models/subsection';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'testapp';
  sections!:Section[];
  articles!:Article[];

  article1:Article={id:1,titre:"titre1",section:"section1",subSection:"subSection1",actif:true}
  article2:Article={id:1,titre:"titre2",section:"section1",subSection:"",actif:true}
  article3:Article={id:1,titre:"titre3",section:"section1",subSection:"subSection1",actif:true}
  article4:Article={id:1,titre:"titre4",section:"section1",subSection:"subSection2",actif:true}
  article5:Article={id:1,titre:"titre5",section:"section1",subSection:"subSection2",actif:true}
  article6:Article={id:1,titre:"titre6",section:"section2",subSection:"",actif:true}

  sectionNames!:string[];

  ngOnInit(): void {
    this.articles=[this.article1,this.article2,this.article3,this.article4,this.article5,this.article6]
    this.toSectionTable(this.articles);
  }

  toSectionTable(articles:Article[]){
    articles.forEach((article)=>{
      if(!this.sectionNames.includes(article.section)){ //si section pas encore dans sections
        
        let section:Section=new Section(); // new section
        section.name=article.section 
        this.sections.push(section) // ajoute nouvelle section au tableau sections
        if(article.subSection==""){
        section.child.push(article)
        }else{

        }
      }
    })
  }

  pushArticleToSection(sectionName:string,article:Article){
    for(var i=0; i < this.sections.length; i++){
      if(this.sections[i].name==sectionName){
        this.sections[i].child.push(article);
        break;
      }
    }
  }

  pushArticleToSubSection(sectionName:string, subSectionName:string,article:Article){
    for(var i=0; i < this.sections.length; i++){
      if(this.sections[i].name==sectionName){
        for(var j=0; j < this.sections[i].child.length; j++){
          if(this.isSubSection(this.sections[i].child[j])){//verification du type. à essayer aussi: if((<Subsection>this.sections[i].child[j]).name!==undefined)
            if((<Subsection>this.sections[i].child[j]).name==subSectionName){
              (<Subsection>this.sections[i].child[j]).articles.push(article)
              break;
            }
          }  
        }
      }
    }
  }

  isSubSection(sectionChild: Subsection | Article): sectionChild is Subsection{
    return (sectionChild as Subsection).name !== undefined
  }

  addSubSectionToSection(sectionName:string, subSectionName:string){
    for(var i=0; i < this.sections.length; i++){
      if(this.sections[i].name==sectionName){
        var subSection=new Subsection();
        subSection.name=subSectionName;
        this.sections[i].child.push(subSection);
        break;
      }
    }
  }

  pushSectionToSections(section:Section){
    this.sections.push(section)
  }




}
