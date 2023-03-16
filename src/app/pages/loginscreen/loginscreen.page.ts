import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-loginscreen',
  templateUrl: './loginscreen.page.html',
  styleUrls: ['./loginscreen.page.scss'],
})
export class LoginscreenPage implements OnInit {

  validationUserMessage ={
    email:[
      {type:"required", message:"Porfavor ingresa un correo"},
      {type:"pattern", message:"El correo electrónico incorrecto"}
    ],
    password:[
      {type:"required", message:"Por favor, introduzca su contraseña!"},
      {type:"minlength", message:"La contraseña debe tener al menos 5 caracteres o más"}

    ]
  }

  validationFormUser: FormGroup;

  constructor(public formbuider: FormBuilder) { }

  ngOnInit() {
  this.validationFormUser = this.formbuider.group({
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ])),
    password: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(5)
    ]))
  })

  }


}

