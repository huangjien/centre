import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleviewComponent } from './simpleview.component';

describe('SimpleviewComponent', () => {
  let component: SimpleviewComponent;
  let fixture: ComponentFixture<SimpleviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
