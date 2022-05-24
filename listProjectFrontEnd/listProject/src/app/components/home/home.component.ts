import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Character } from 'src/models/Character';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public apiService:ApiService) { }

  Character:any= []

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
