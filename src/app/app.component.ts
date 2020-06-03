    import { Component, VERSION } from '@angular/core';
    //import { HttpClient } from '@angular/common/http';
    declare var require: any
    const FileSaver = require('file-saver');

    @Component({
      selector: 'my-app',
      templateUrl: './app.component.html',
      styleUrls: [ './app.component.css' ]
    })
    export class AppComponent  {
    isSelected: boolean = true;
    isSelectedAll: boolean = true;
    items =[1,2,3,4,5];
    selectedItem=[];
    stringItems =['aravind','Venki'];
    
 
  downloadFiles(){
    debugger;
    let files=[];
    files[0]="https://i.stack.imgur.com/yyq8k.png";
    files[1]="https://i.stack.imgur.com/ISG1g.jpg?s=328&g=1";
    let fileName=[];
    fileName[0]="file1.png";
    fileName[1]="file2.jpg"

    for(let i =0; i<files.length; i++){
      
      this.downloadFile(files[i],fileName[i]);
    }
  
  }

   downloadFile(url,filename): void {
  debugger;
          const xhr = new XMLHttpRequest();
          xhr.responseType = 'blob';
          xhr.onload = (event) => {
            /* Create a new Blob object using the response
            *  data of the onload object.
            */
            const blob = new Blob([xhr.response], { type: 'image/jpg' });
            const a: any = document.createElement('a');
            a.style = 'display: none';
            document.body.appendChild(a);
            const url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(url);
          };
          xhr.open('GET', url);
          xhr.send();
        
      }

  download(fileUrl, fileName){
      let link = document.createElement('a');
      link.setAttribute('type', 'hidden');
      link.setAttribute('target','_blank');
      //link.href = files[i];
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
  }

   toggleChkAll(){
     this.isSelectedAll = !this.isSelectedAll;
     this.isSelected = this.isSelectedAll;
   }

   getItemValues(item){
     console.log("ITEM: "+this.selectedItem);
   }
    applications=[{
      "Username": "Praviya Ravi US015631799-MSP01",
      "ParticipantDocument": [
        {
          "id": null,
          "Type": "PhotoGrid.docx"
        },
        {
          "id": null,
          "Type": "Resume"
        }
      ]
    },
    {
      "Username": "Aravind",
      "ParticipantDocument": [
        {
          "id": null,
          "Type": "PhotoGrid.docx"
        },
        {
          "id": null,
          "Type": "Resume123"
        }
      ]
    }
    ];
    csv = "";
    
    ngOnInit(){
      console.log("ITEM PRESENCE : "+ this.stringItems.indexOf('arav'));
    }
    generateReport(){
      let csvHeaderList=[];
      let csvHeader;
      let csvBody;
      let participantDocument;
      let type=[];
      csvHeaderList.push("Username");
      for(let i=0;i<this.applications.length;i++)
      {
        participantDocument=this.applications[i].ParticipantDocument;
      
       
        for(let j=0;j<participantDocument.length;j++)
        {
          if(csvHeaderList.indexOf(participantDocument[j].Type)== -1)
            csvHeaderList.push(participantDocument[j].Type)
        }
      }
      console.log("CSV"+csvHeaderList);
      csvHeader=csvHeaderList;
      for(let i=0;i<this.applications.length;i++)
      {
        participantDocument=this.applications[i].ParticipantDocument;
        csvBody=csvBody+this.applications[i].Username + ",";
        
        for(let z=0;z<participantDocument.length;z++){
          type[z]=participantDocument[z].Type;
        }
        console.log("TYPE"+type);

        for(let j=1;j<csvHeaderList.length;j++)
        {
                 
            if(type.indexOf(csvHeaderList[j])== -1){
              csvBody=csvBody+"No,";
              console.log("TYPE: "+type+"| Header: "+csvHeaderList[j]+": | FALSE");
            }else{              
              csvBody=csvBody+"Yes,";
               console.log("TYPE: "+type+"| Header: "+csvHeaderList[j]+": | TRUE");
            }
          csvBody=csvBody.replace("undefined","")+"\r\n";
              
          }
          
        }
        csvBody=csvBody + "\r\n";
        this.csv=csvHeader + "\r\n"+ csvBody; 
      }     
      
    }
    
