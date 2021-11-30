import { Component, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Article } from 'src/modules/api/interfaces';
import { ArticlesFilter } from 'src/modules/home/+state/home.reducer';

@Component({
  selector: 'article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent {
  @Input() articles: Article[] | null = [];
  @Input() loading: boolean | null = false;
  @Input() page: number | undefined = 1;
  @Input() totalPages: number | null = 1;

  constructor(private store: Store) {}

  toggleFavorite(slug: string) {
    console.log(slug);
  }
}
