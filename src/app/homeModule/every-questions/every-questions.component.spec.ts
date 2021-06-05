import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EveryQuestionsComponent } from './every-questions.component';

describe('EveryQuestionsComponent', () => {
  let component: EveryQuestionsComponent;
  let fixture: ComponentFixture<EveryQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EveryQuestionsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EveryQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
