import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AppModule } from '../../app.module';
import { FormBuilder, FormControl } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { QuestionsService } from '../../_shared/_services/questions.service';
import { NewQuestionComponent } from './new-question.component';
import { Question } from '../../_shared/_models/Question';
import { Tags } from '../../_shared/_models/Tags';
import { of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

describe('NewQuestionComponent', () => {
  let component: NewQuestionComponent;
  let fixture: ComponentFixture<NewQuestionComponent>;
  let question: Question;
  let tags: Tags[];
  let el: HTMLElement;
  let de: DebugElement;
  let formBuilderStub: FormBuilder;

  question = {
    date: 12254662136,
    author: '12345@mail.ru',
    title: 'Hello everyone',
    textarea: '',
    tags: [],
    comments: [],
    isApproval: false,
  };

  tags = [
    {
      id: '0',
      item: 'Java',
    },
    {
      id: '1',
      item: 'Javascript',
    },
    {
      id: '2',
      item: '.Net',
    },
    {
      id: '3',
      item: 'Salesforce',
    },
  ];

  const questionServiceStub = {
    createQuestion: (obj: Question) => of(obj),
  };

  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      declarations: [NewQuestionComponent],
      providers: [{ provide: QuestionsService, useValue: questionServiceStub }, { provide: Router, useValue: routerSpy }, FormBuilder],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(NewQuestionComponent);
        component = fixture.componentInstance;
        formBuilderStub = fixture.debugElement.injector.get(FormBuilder);
        de = fixture.debugElement.query(By.css('form'));
        el = de.nativeElement;
        fixture.detectChanges();
      });
  });

  it('should create new Question component', () => {
    expect(component).toBeTruthy();
  });

  it('should init form in "ngOnInit"', () => {
    spyOn(formBuilderStub, 'group').and.callThrough();
    component.ngOnInit();
    expect(formBuilderStub.group).toHaveBeenCalled();
  });

  it('should render title in a h2 tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    el = compiled.querySelector('h2').textContent;
    expect(el).toContain('New Question');
  });

  it('should call the "onSubmit()" method', () => {
    spyOn(component, 'onSubmit');
    let el = fixture.debugElement.query(By.css('form')).nativeElement;
    el.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(0);
  });

  it('should check for "onSubmit() that subscribe called', fakeAsync(() => {
    let spyQuestion = spyOn(questionServiceStub, 'createQuestion').and.returnValue(of(question).pipe(delay(1)));
    let subSpy = spyOn(questionServiceStub.createQuestion(question), 'subscribe');
    component.onSubmit();
    tick();

    expect(spyQuestion).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
  }));

  it('should check for "onSubmit()" error called', () => {
    spyOn(questionServiceStub, 'createQuestion').and.returnValue(throwError('Error'));
    component.onSubmit();
    expect(questionServiceStub.createQuestion).toHaveBeenCalled();
  });

  it('form invalid when empty', () => {
    expect(component.newQuestionForm.valid).toBeFalsy();
  });

  it('title field validity', () => {
    let title = component.newQuestionForm.controls['title'];
    expect(title.valid).toBeFalsy();

    let errors = {};
    errors = title.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('textarea field validity', () => {
    let textarea = component.newQuestionForm.controls['textarea'];
    expect(textarea.valid).toBeFalsy();

    let errors = {};
    errors = textarea.errors || {};
    expect(errors['required']).toBeTruthy();

    textarea.setValue('Hello');
    errors = textarea.errors || {};
    expect(errors['minlength']).toBeTruthy();
  });

  it('tags array validity', () => {
    let form = component.newQuestionForm;
    expect(form.get('tags')?.valid).toEqual(false);
    form.get('tags')?.setValue(tags.map((tag: Tags) => tag.item === 'Java'));
    expect(form.get('tags')?.valid).toEqual(true);
  });

  it('form valid', () => {
    expect(component.newQuestionForm.valid).toBeFalsy();
    component.newQuestionForm.controls['title'].setValue('Hello');
    component.newQuestionForm.controls['textarea'].setValue('Thank you very much');
    component.tagsFormArray.push(new FormControl(true));
    expect(component.newQuestionForm.valid).toBeTruthy();
  });

  it('should return to page everyQuestions', () => {
    component.onCancel();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['everyQuestions']);
  });
});
