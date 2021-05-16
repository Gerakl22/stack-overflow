import { Component, OnInit } from '@angular/core';
import * as categories from '../../../assets/data/categories.json';

@Component({
  selector: 'app-every-questions',
  templateUrl: './every-questions.component.html',
  styleUrls: ['./every-questions.component.scss']
})
export class EveryQuestionsComponent implements OnInit {

  categoryList?: { item: string; }[];

  constructor() { }

  ngOnInit(): void {
    this.categoryList = categories.categories;
  }

}
