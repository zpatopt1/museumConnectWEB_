import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCoderComponent } from './delete-coder.component';

describe('DeleteCoderComponent', () => {
  let component: DeleteCoderComponent;
  let fixture: ComponentFixture<DeleteCoderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteCoderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteCoderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
