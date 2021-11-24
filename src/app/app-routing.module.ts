import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleListComponent } from 'src/modules/article-list/article-list/article-list.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('src/modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'article/:slug',
    loadChildren: () =>
      import('src/modules/article/article.module').then((m) => m.ArticleModule),
  },
  {
    path: 'editor',
    loadChildren: () =>
      import('src/modules/article-editor/article-editor.module').then(
        (m) => m.ArticleEditorModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
