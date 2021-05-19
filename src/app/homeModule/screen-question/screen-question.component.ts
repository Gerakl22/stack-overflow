import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-screen-question',
  templateUrl: './screen-question.component.html',
  styleUrls: ['./screen-question.component.scss']
})
export class ScreenQuestionComponent implements OnInit {

  urlPath!: string;
  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.url.subscribe(
      (url) => this.urlPath = url[1].path,
    );
  }

  ngOnInit(): void {
    console.log(this.urlPath);
  }

}
