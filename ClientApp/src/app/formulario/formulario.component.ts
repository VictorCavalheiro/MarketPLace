import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  user: any = {
    name:'victor',
    email:'victor.cavalheiro17@gmail.com',
    region:'+701',
    phoneNumber:'91234206',
    work:'dev',
    password:'1234',
    repeatPassword:'1234'
  }

  onSubmit(form){
    console.log(form.value);
  }

  constructor() { }

  ngOnInit() {
  }

}
