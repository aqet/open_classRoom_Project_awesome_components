import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardSubtitle, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-complex-form',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardActions,
    ReactiveFormsModule,
    NgIf,
    MatButtonModule
  ],
  templateUrl: './complex-form.component.html',
  styleUrl: './complex-form.component.scss'
})
export class ComplexFormComponent implements OnInit {
  onSubmitForm() {
    
  }

  mainForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  
  ngOnInit(): void {
      this.initMainForm();
  }
  

  initMainForm(): void {
    this.mainForm = this.formBuilder.group({});
  }

}
