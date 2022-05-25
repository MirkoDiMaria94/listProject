import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { Character } from 'src/models/Character';


@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.css']
})
export class ListEditComponent implements OnInit {
  submitted = false;
  editForm = new FormGroup({});
  CharacterData = [];


  constructor(public fb:FormBuilder,
    public router:Router,
    public actRoute: ActivatedRoute, 
    public apiService:ApiService) {
    
   }

  ngOnInit() {
   this.updateCharacter();
   let id = this.actRoute.snapshot.paramMap.get('id');
   this.getCharacter(id);
   this.editForm = this.fb.group({
    // 'id':['', [Validators.required]],
     name:['', [Validators.required]],
     description: ['', [Validators.required]]
   })

  }


    // Getter per accedere al controllo del modulo
    get myForm() {
      return this.editForm.controls;
    }


    getCharacter(id){
      this.apiService.getCharacter(id).subscribe(data => {
        this.editForm.setValue({
          name: data['name'],
          description: data['description']
        })
      })
    }


    updateCharacter(){
      this.editForm = this.fb.group({
       // 'id':['', [Validators.required]],
        name:['', [Validators.required]],
        description: ['', [Validators.required]]
      })

    }
    

    onSubmit() {
      this.submitted = true;
      if (!this.editForm.valid) {
        return false;
      } else {
        if (window.confirm('Sei siucuro di aggiornare il Personaggio ?')) {
          let id = this.actRoute.snapshot.paramMap.get('id');
          this.apiService.updateCharacter(id, this.editForm.value)
            .subscribe(res => {
              this.router.navigateByUrl('/home');
              console.log('Contenuto aggiornato correttamente!')
            }, (error) => {
              console.log(error)
            })
        }
      }
    }
  
}
