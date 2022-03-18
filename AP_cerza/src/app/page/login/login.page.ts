import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})

export class LoginPage {
  ionicForm: FormGroup;
  isSubmitted = false;
  constructor(public formBuilder: FormBuilder) { }
  get errorControl() {
    return this.ionicForm.controls;
  }

  Connection(){
    if (this.ionicForm.value.login == "login" && this.ionicForm.value.password == "password")
    {
      return true
    }
    else
    {
      return false
    }
  }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', Validators.required]
    })
  }
  
  submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.ionicForm.value)
      
    }
  }
}