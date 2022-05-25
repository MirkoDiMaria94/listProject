import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';


@Component({
  selector: 'app-list-create',
  templateUrl: './list-create.component.html',
  styleUrls: ['./list-create.component.css']
})
export class ListCreateComponent implements OnInit {
  submitted= false;
  listForm = new FormGroup({});

  constructor(public fb:FormBuilder, 
    private router:Router,
    private apiService:ApiService, 
    private ngZone:NgZone) {
      
    this.mainForm();

     }

  ngOnInit(): void {
  }


  mainForm() {
    this.listForm= this.fb.group({
      //'id': ['',[Validators.required]],
      name:['',[Validators.required]],
      description:['',[Validators.required]],
    })
  }

   // Getter per accedere al controllo del modulo
   get myForm(){
    return this.listForm.controls;
  }

  onSubmit() {
    
    this.submitted = true;
    if (!this.listForm.valid) {
      console.log('form non valido');
      return false;
    } else {
      this.apiService.createCharacter(this.listForm.value).subscribe ((res) => {
          console.log('Personaggio creato con successo')
          this.ngZone.run(() => this.router.navigateByUrl('/home'))
        }, (error) => {
          console.log(error);
        });
    }
  }

}
