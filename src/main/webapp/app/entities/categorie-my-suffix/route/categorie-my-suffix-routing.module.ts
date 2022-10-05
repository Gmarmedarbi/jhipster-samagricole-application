import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CategorieMySuffixComponent } from '../list/categorie-my-suffix.component';
import { CategorieMySuffixDetailComponent } from '../detail/categorie-my-suffix-detail.component';
import { CategorieMySuffixUpdateComponent } from '../update/categorie-my-suffix-update.component';
import { CategorieMySuffixRoutingResolveService } from './categorie-my-suffix-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const categorieRoute: Routes = [
  {
    path: '',
    component: CategorieMySuffixComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CategorieMySuffixDetailComponent,
    resolve: {
      categorie: CategorieMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CategorieMySuffixUpdateComponent,
    resolve: {
      categorie: CategorieMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CategorieMySuffixUpdateComponent,
    resolve: {
      categorie: CategorieMySuffixRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(categorieRoute)],
  exports: [RouterModule],
})
export class CategorieMySuffixRoutingModule {}
