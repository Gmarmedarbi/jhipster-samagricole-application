import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ArticleMySuffixComponent } from '../list/article-my-suffix.component';
import { ArticleMySuffixDetailComponent } from '../detail/article-my-suffix-detail.component';
import { ArticleMySuffixUpdateComponent } from '../update/article-my-suffix-update.component';
import { ArticleMySuffixRoutingResolveService } from './article-my-suffix-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const articleRoute: Routes = [
  {
    path: '',
    component: ArticleMySuffixComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ArticleMySuffixDetailComponent,
    resolve: {
      article: ArticleMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ArticleMySuffixUpdateComponent,
    resolve: {
      article: ArticleMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ArticleMySuffixUpdateComponent,
    resolve: {
      article: ArticleMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(articleRoute)],
  exports: [RouterModule],
})
export class ArticleMySuffixRoutingModule {}
