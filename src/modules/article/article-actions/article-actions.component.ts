import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Profile } from 'src/modules/api/interfaces';

@Component({
  selector: 'app-article-actions',
  templateUrl: './article-actions.component.html',
  styleUrls: ['./article-actions.component.scss'],
})
export class ArticleActionsComponent {
  @Input() isAuthorActions: boolean;

  @Input() user: Profile;
  @Input() articleSlug: string;
  @Input() createdAt: string;
  @Input() favoritesCount: number;

  @Output() favorite = new EventEmitter<string>();
  @Output() followUser = new EventEmitter<string>();

  @Output() editArticle = new EventEmitter<string>();
  @Output() removeArticle = new EventEmitter<string>();

  onFavorite() {
    this.favorite.emit(this.articleSlug);
  }

  onFollow() {
    this.followUser.emit(this.user.username);
  }
}
