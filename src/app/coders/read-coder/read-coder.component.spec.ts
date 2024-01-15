import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadCoderComponent } from './read-coder.component';

describe('ReadCoderComponent', () => {
  let component: ReadCoderComponent;
  let fixture: ComponentFixture<ReadCoderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReadCoderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReadCoderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
