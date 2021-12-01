import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPromptComponent } from './input-prompt.component';

describe('InputPromptComponent', () => {
  let component: InputPromptComponent;
  let fixture: ComponentFixture<InputPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputPromptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
