import { Component, OnInit } from '@angular/core';
import * as categories from '../../../assets/data/categories.json';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  categoryList?: { item: string; }[];

  constructor() {}

  ngOnInit(): void {
    this.categoryList = categories.categories;
  }

}
