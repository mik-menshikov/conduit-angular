import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
  {
    path: 'profile',
    loadChildren: () =>
      import('src/modules/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('src/modules/settings/settings.module').then(
        (m) => m.SettingsModule
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
