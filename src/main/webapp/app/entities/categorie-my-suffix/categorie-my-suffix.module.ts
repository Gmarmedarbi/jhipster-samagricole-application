import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CategorieMySuffixComponent } from './list/categorie-my-suffix.component';
import { CategorieMySuffixDetailComponent } from './detail/categorie-my-suffix-detail.component';
import { CategorieMySuffixUpdateComponent } from './update/categorie-my-suffix-update.component';
import { CategorieMySuffixDeleteDialogComponent } from './delete/categorie-my-suffix-delete-dialog.component';
import { CategorieMySuffixRoutingModule } from './route/categorie-my-suffix-routing.module';

@NgModule({
  imports: [SharedModule, CategorieMySuffixRoutingModule],
  declarations: [
    CategorieMySuffixComponent,
    CategorieMySuffixDetailComponent,
    CategorieMySuffixUpdateComponent,
    CategorieMySuffixDeleteDialogComponent,
  ],
})
export class CategorieMySuffixModule {}
