import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Character } from 'src/models/Character';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Character:any= [{
    "id":1,
    "name":"Michele",
    "description":"prova",
 },
 {
    "id":2,
    "name":"Stefano",
    "description":"prova2",
    }


]
  selectedRow: any;
  selectedAll:boolean =false;



  constructor(public apiService:ApiService) {
    this.selectedRow = [];
   }

   selectAll(index) {
    if (typeof (index) == 'undefined') {
     this.selectedAll = !this.selectedAll;
     this.selectedRow = [];
    } else {
     this.selectedRow.push(index);
     console.log(this.selectedAll);
     console.log(this.selectedRow);
    }
   }
   

  ngOnInit(): void {
  }

  readCharacter(){
    this.apiService.getCharacters().subscribe((data)=>{
      this.Character= data;
    })
  }

  removeCharacter(character, index) {
    if(window.confirm('Sei sicuro di eliminare lo studente ?')) {
        this.apiService.deleteStudent(character.id).subscribe((data) => {
          this.Character.splice(index, 1);
        }
      )    
    }
  }

}
