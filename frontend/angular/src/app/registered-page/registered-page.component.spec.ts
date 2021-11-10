import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredPageComponent } from './registered-page.component';

describe('RegisteredPageComponent', () => {
  let component: RegisteredPageComponent;
  let fixture: ComponentFixture<RegisteredPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteredPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
