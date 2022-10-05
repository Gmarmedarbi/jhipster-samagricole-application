import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ArticleMySuffixComponent } from './list/article-my-suffix.component';
import { ArticleMySuffixDetailComponent } from './detail/article-my-suffix-detail.component';
import { ArticleMySuffixUpdateComponent } from './update/article-my-suffix-update.component';
import { ArticleMySuffixDeleteDialogComponent } from './delete/article-my-suffix-delete-dialog.component';
import { ArticleMySuffixRoutingModule } from './route/article-my-suffix-routing.module';

@NgModule({
  imports: [SharedModule, ArticleMySuffixRoutingModule],
  declarations: [
    ArticleMySuffixComponent,
    ArticleMySuffixDetailComponent,
    ArticleMySuffixUpdateComponent,
    ArticleMySuffixDeleteDialogComponent,
  ],
})
export class ArticleMySuffixModule {}
