import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCodersComponent } from './list-coders.component';

describe('ListCodersComponent', () => {
  let component: ListCodersComponent;
  let fixture: ComponentFixture<ListCodersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListCodersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListCodersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
