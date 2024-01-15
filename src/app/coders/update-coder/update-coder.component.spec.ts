import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCoderComponent } from './update-coder.component';

describe('UpdateCoderComponent', () => {
  let component: UpdateCoderComponent;
  let fixture: ComponentFixture<UpdateCoderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateCoderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateCoderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
