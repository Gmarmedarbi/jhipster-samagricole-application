import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'categorie-my-suffix',
        data: { pageTitle: 'samagricoleApp.categorie.home.title' },
        loadChildren: () => import('./categorie-my-suffix/categorie-my-suffix.module').then(m => m.CategorieMySuffixModule),
      },
      {
        path: 'article-my-suffix',
        data: { pageTitle: 'samagricoleApp.article.home.title' },
        loadChildren: () => import('./article-my-suffix/article-my-suffix.module').then(m => m.ArticleMySuffixModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
