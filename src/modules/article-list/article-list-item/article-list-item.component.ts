import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Article } from 'src/modules/api/interfaces';

@Component({
  selector: 'app-article-list-item',
  templateUrl: './article-list-item.component.html',
  styleUrls: ['./article-list-item.component.scss'],
})
export class ArticleListItemComponent {
  @Input() article!: Article;

  @Output() onToggleFavorite = new EventEmitter<string>();
}
