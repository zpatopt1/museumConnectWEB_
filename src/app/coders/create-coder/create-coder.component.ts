import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Coder } from "../coder";
import { CodersService } from '../coders.service';

@Component({
  selector: 'app-create-coder',
  templateUrl: './create-coder.component.html',
  styleUrl: './create-coder.component.css'
})
export class CreateCoderComponent {

  createCoderForm: FormGroup;
  coder: Coder;
  pictureCreate: string = 'assets/images/avatar.png';
  file: File = new File([], '', { type: 'text/plain' });
  @ViewChild('closeCreatePopupButton') closeCreatePopupButton!: ElementRef;
  // @Output() closePopup = new EventEmitter<void>();

  constructor(private formBuilder: FormBuilder,
    private service: CodersService) {
    this.createCoderForm = this.formBuilder.group({
      code: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
    this.coder = {
      id: '',
      code: '',
      firstName: '',
      lastName: '',
      email: '',
      picture: ''
    }
  }
  createCoder() {
    if (this.createCoderForm.valid) {

      try {
        //call service
        this.service.addCoder(this.coder).then((result) => {
          const fileNameSplit = this.file.name.split('.');
          this.coder.id = result.id;
          this.coder.picture = this.coder.id + '.' + fileNameSplit[fileNameSplit.length - 1];
          this.service.uploadFile(this.coder.picture, this.file)

          this.service.updateCoder(this.coder);

        }).then(() =>{
          this.createCoderForm.reset();
        }).catch((error) => {
          console.log(error);
        });
        this.closeCreatePopupButton.nativeElement.click();
      } catch (error) {
        console.error(error);
      }

    } else {
      // Handle invalid form
      this.createCoderForm.markAllAsTouched();
      console.error('Form is invalid');
    }

  }

  //verify if input was touched
  isFieldTouched(fieldName: string) {
    let isTouched: boolean = true
    const control = this.createCoderForm.get(fieldName);
    if (control != null)
      isTouched = control.touched;
    return isTouched;
  }

  //verify if input value is valid 
  isFieldInvalid(fieldName: string) {
    let isInvalid: boolean = true;
    const control = this.createCoderForm.get(fieldName);
    if (control != null)
      isInvalid = control.invalid && (control.touched || control.dirty);
    return isInvalid;
  }

  displayImageCreate(event: Event): void {
    console.log(event.target);

    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files[0]) {

      this.file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.pictureCreate = e.target.result;
      };
      reader.readAsDataURL(fileInput.files[0]);
    }
  }





}
