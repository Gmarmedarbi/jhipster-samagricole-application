import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICategorieMySuffix } from '../categorie-my-suffix.model';
import { CategorieMySuffixService } from '../service/categorie-my-suffix.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './categorie-my-suffix-delete-dialog.component.html',
})
export class CategorieMySuffixDeleteDialogComponent {
  categorie?: ICategorieMySuffix;

  constructor(protected categorieService: CategorieMySuffixService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.categorieService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
