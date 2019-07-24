import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  user: any = {
    name: null,
    email:null,
    region: null,
    phoneNumber:null,
    work:null,
    password:null,
    repeatPassword:null
  }

  onSubmit(form){
    console.log(form.value);
  }

  constructor() { }

  ngOnInit() {
  }

}
