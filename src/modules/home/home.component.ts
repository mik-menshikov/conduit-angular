import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ArticleListActions from 'src/modules/article-list/+state/article-list.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(ArticleListActions.loadArticleLists());
  }
}
