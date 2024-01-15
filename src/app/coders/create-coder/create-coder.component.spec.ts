import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCoderComponent } from './create-coder.component';

describe('CreateCoderComponent', () => {
  let component: CreateCoderComponent;
  let fixture: ComponentFixture<CreateCoderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateCoderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateCoderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
