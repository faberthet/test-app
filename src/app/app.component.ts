import { Component, OnInit } from '@angular/core';
import { Article } from './models/article';
import { Section } from './models/section';
import { SectionChild } from './models/section-child';
import { Subsection } from './models/subsection';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'testapp';
  sections:Section[]=[];
  articles!:Article[];

  article1:Article={id:1,titre:"titre1",section:"section1",subSection:"subSection1",actif:true}
  article2:Article={id:1,titre:"titre2",section:"section1",subSection:"",actif:true}
  article22:Article={id:1,titre:"titre22",section:"section1",subSection:"",actif:true}
  article3:Article={id:1,titre:"titre3",section:"section1",subSection:"subSection1",actif:true}
  article4:Article={id:1,titre:"titre4",section:"section1",subSection:"subSection2",actif:true}
  article5:Article={id:1,titre:"titre5",section:"section1",subSection:"subSection2",actif:true}
  article6:Article={id:1,titre:"titre6",section:"section2",subSection:"",actif:true}

  sectionNames!:string[];

  ngOnInit(): void {
    this.articles=[this.article1,this.article2,this.article22,this.article3,this.article4,this.article5,this.article6]
    this.toSectionTable(this.articles);
    console.log(this.sections)
  }

  toSectionTable(articles:Article[]){
    articles.forEach((article)=>{
      if(!this.isSectionInSections(article.section)){ //si section déjà dans sections
          this.createSection(article.section)
      }  
      if(article.subSection==""){ //si l'article n'est pas dans une sous-section
          this.pushArticleToSection(article.section,article)
      }else{ //si l'article est dans une sous-section
        if(!this.isSubSectionInSection(article.section,article.subSection)){ //si la sous-section n'est pas encore dans la section
          this.addSubSectionToSection(article.section,article.subSection)
        }
        this.pushArticleToSubSection(article.section, article.subSection,article)
      }
    })
  }

  isSectionInSections(sectionName:string){
    for(var i=0; i < this.sections.length; i++){
      if(this.sections[i].name==sectionName){
        return true;
      }
    }
    return false;
  }

  isSubSectionInSection(sectionName:string,subSectionName:string){
    for(var i=0; i < this.sections.length; i++){
      if(this.sections[i].name==sectionName){
        for(var j=0; j < this.sections[i].children.length; j++){
          if(this.isSubSection(this.sections[i].children[j])){
            if(this.sections[i].children[j].subSection?.name==subSectionName){
              return true 
            }
          }
        }
      }
    }
    return false
  }

  pushArticleToSection(sectionName:string,article:Article){
    for(var i=0; i < this.sections.length; i++){
      if(this.sections[i].name==sectionName){
        var sectionChild=new SectionChild();
        sectionChild.type="article"
        sectionChild.article=article
        this.sections[i].children.push(sectionChild); 
        break;
      }
    }
  }

  pushArticleToSubSection(sectionName:string, subSectionName:string,article:Article){
    for(var i=0; i < this.sections.length; i++){
      if(this.sections[i].name==sectionName){
        for(var j=0; j < this.sections[i].children.length; j++){
          if(this.isSubSection(this.sections[i].children[j])){//verification du type. à essayer aussi: if((<Subsection>this.sections[i].child[j]).name!==undefined)
            if(this.sections[i].children[j].subSection?.name==subSectionName){
              this.sections[i].children[j].subSection?.articles.push(article)
              break;
            }
          }  
        }
      }
    }
  }

  isSubSection(sectionChild: SectionChild):boolean{
    return sectionChild.type=="subSection"
  }

  addSubSectionToSection(sectionName:string, subSectionName:string){
    for(var i=0; i < this.sections.length; i++){
      if(this.sections[i].name==sectionName){
        var sectionChild=new SectionChild();
        sectionChild.type="subSection"
        sectionChild.subSection=this.createSubSection(subSectionName)
        this.sections[i].children.push(sectionChild);
        break;
      }
    }
  }

  pushSectionToSections(section:Section){
    this.sections.push(section)
  }

  createSection(sectionName:string){
    var section:Section=new Section(); // new section
    section.name=sectionName
    section.children=[]
    this.sections.push(section)
  }
  createSubSection(subSectionName:string){
    var subSection=new Subsection();
    subSection.name=subSectionName;
    subSection.articles=[];
    return subSection
  }


}
