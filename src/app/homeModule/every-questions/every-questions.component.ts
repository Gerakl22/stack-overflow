import { Component, OnInit } from '@angular/core';
import * as tags from '../../../assets/data/tags.json';
import {ITags} from '../../_shared/_models/ITags';

@Component({
  selector: 'app-every-questions',
  templateUrl: './every-questions.component.html',
  styleUrls: ['./every-questions.component.scss']
})
export class EveryQuestionsComponent implements OnInit {

  tagsData!: ITags[];

  constructor() { }

  ngOnInit(): void {
    this.tagsData = tags.tags;
  }

}
