import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenQuestionComponent } from './screen-question.component';

describe('ScreenQuestionComponent', () => {
  let component: ScreenQuestionComponent;
  let fixture: ComponentFixture<ScreenQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
