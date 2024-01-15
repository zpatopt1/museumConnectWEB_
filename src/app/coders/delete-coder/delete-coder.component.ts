import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Coder } from '../coder';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CodersService } from '../coders.service';

@Component({
  selector: 'app-delete-coder',
  templateUrl: './delete-coder.component.html',
  styleUrl: './delete-coder.component.css'
})
export class DeleteCoderComponent {
  @Input() coder: Coder;
  deleteCoderForm: FormGroup;
  @ViewChild('closePopupButton') closePopupButton!: ElementRef;


  constructor(private formBuilder: FormBuilder, private service: CodersService){
    this.deleteCoderForm = this.formBuilder.group({
      code: [{ value: '', disabled: true }],
      firstName: [{ value: '', disabled: true }],
      lastName: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }]
    });
    this.coder = {
      id: '',
      code: '',
      firstName: '',
      lastName: '',
      email: '',
      picture: ''
    };
  }

  deleteCoder(){
    console.log('passei2');
    try {
      //call service
      this.service.deleteCoder(this.coder);
      this.closePopupButton.nativeElement.click();
    } catch (error) {
      console.error(error);
    }
  }
}
