import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CategorieMySuffixFormService, CategorieMySuffixFormGroup } from './categorie-my-suffix-form.service';
import { ICategorieMySuffix } from '../categorie-my-suffix.model';
import { CategorieMySuffixService } from '../service/categorie-my-suffix.service';

@Component({
  selector: 'jhi-categorie-my-suffix-update',
  templateUrl: './categorie-my-suffix-update.component.html',
})
export class CategorieMySuffixUpdateComponent implements OnInit {
  isSaving = false;
  categorie: ICategorieMySuffix | null = null;

  editForm: CategorieMySuffixFormGroup = this.categorieFormService.createCategorieMySuffixFormGroup();

  constructor(
    protected categorieService: CategorieMySuffixService,
    protected categorieFormService: CategorieMySuffixFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ categorie }) => {
      this.categorie = categorie;
      if (categorie) {
        this.updateForm(categorie);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const categorie = this.categorieFormService.getCategorieMySuffix(this.editForm);
    if (categorie.id !== null) {
      this.subscribeToSaveResponse(this.categorieService.update(categorie));
    } else {
      this.subscribeToSaveResponse(this.categorieService.create(categorie));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICategorieMySuffix>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(categorie: ICategorieMySuffix): void {
    this.categorie = categorie;
    this.categorieFormService.resetForm(this.editForm, categorie);
  }
}
