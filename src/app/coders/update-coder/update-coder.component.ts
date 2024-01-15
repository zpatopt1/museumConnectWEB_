import { Component, ViewChild, ElementRef, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Coder } from '../coder';
import { CodersService } from '../coders.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-update-coder',
  templateUrl: './update-coder.component.html',
  styleUrl: './update-coder.component.css'
})
export class UpdateCoderComponent {
  @Input() coder: Coder;
  pictureUpdate: string = 'assets/images/avatar.png';
  file: File = new File([], '', { type: 'text/plain'});
  updateCoderForm: FormGroup;
  coderSubscription: Subscription | undefined;
  @ViewChild('closeUpdatePopupButton') closeUpdatePopupButton!: ElementRef;


  constructor(private formBuilder: FormBuilder, private service: CodersService) {

    this.updateCoderForm = this.formBuilder.group({
      code: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],

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


  updateCoder() {
    if (this.updateCoderForm.valid) {
      try {
        //call service
        this.service.updateCoder(this.coder).then(()=>{
          this.service.uploadFile(this.coder.picture, this.file);
          this.closeUpdatePopupButton.nativeElement.click();
        });
        
      } catch (error) {
        console.error(error);
      }

    } else {
      // Handle invalid form
      this.updateCoderForm.markAllAsTouched();
      console.error('Form is invalid');
    }

  }

  //verify if input was touched
  isFieldTouched(fieldName: string) {
    let isTouched: boolean = true
    const control = this.updateCoderForm.get(fieldName);
    if (control != null)
      isTouched = control.touched;
    return isTouched;
  }

  //verify if input value is valid 
  isFieldInvalid(fieldName: string) {
    let isInvalid: boolean = true;
    const control = this.updateCoderForm.get(fieldName);
    if (control != null)
      isInvalid = control.invalid && (control.touched || control.dirty);
    return isInvalid;
  }

  public loadCoder(coderId: string) {

    if (coderId !== undefined) {
      this.service.getCoderById(coderId).subscribe((data) => {

        if (data?.id !== '') {

          this.coder = {
            id: coderId,
            code: data.code,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            picture: data.picture
          };
          try {
            this.service.downloadFile(this.coder.picture).subscribe((pictureData) => {
              
              this.pictureUpdate = pictureData;

            });
          } catch (error) {

            this.pictureUpdate = 'assets/images/avatar.png';
          }

        } else {
          console.log('Data ID is empty.');
        }
      }, (error) => {
        console.error('Error fetching coder data:', error); // Log any error from getCoderById
      });
    } else {
      console.log('Coder ID is undefined. Error.');
    }

  }

  displayImageUpdate(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      this.file = fileInput.files[0];
      
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.pictureUpdate = e.target.result;
      };
      reader.readAsDataURL(fileInput.files[0]);
    }
    
  }


}
