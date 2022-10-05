import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IArticleMySuffix } from '../article-my-suffix.model';
import { ArticleMySuffixService } from '../service/article-my-suffix.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './article-my-suffix-delete-dialog.component.html',
})
export class ArticleMySuffixDeleteDialogComponent {
  article?: IArticleMySuffix;

  constructor(protected articleService: ArticleMySuffixService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.articleService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
