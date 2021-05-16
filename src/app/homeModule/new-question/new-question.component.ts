import { Component, OnInit } from '@angular/core';
import * as categories from '../../../assets/data/categories.json';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss']
})
export class NewQuestionComponent implements OnInit {

  categoryList?: { item: string; }[];
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.categoryList = categories.categories;
    console.log(this.categoryList);
  }

  onCancel(): void {
    this.router.navigate(['everyQuestions']);
  }
}
