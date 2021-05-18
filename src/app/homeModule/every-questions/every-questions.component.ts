import { Component, OnInit } from '@angular/core';
import {Tags} from '../../_shared/_models/Tags';
import {Theme} from '../../_shared/_models/Theme';
import {TagsConstants} from '../../_shared/constants/TagsConstants';
import {ThemeConstants} from '../../_shared/constants/ThemeConstants';

@Component({
  selector: 'app-every-questions',
  templateUrl: './every-questions.component.html',
  styleUrls: ['./every-questions.component.scss']
})
export class EveryQuestionsComponent implements OnInit {

  tagsData!: Tags[];
  themeData!: Theme[];

  constructor() { }

  ngOnInit(): void {
    this.tagsData = TagsConstants;
    this.themeData = ThemeConstants;
  }

}
