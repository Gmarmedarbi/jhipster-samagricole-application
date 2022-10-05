import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ArticleMySuffixFormService, ArticleMySuffixFormGroup } from './article-my-suffix-form.service';
import { IArticleMySuffix } from '../article-my-suffix.model';
import { ArticleMySuffixService } from '../service/article-my-suffix.service';
import { ICategorieMySuffix } from 'app/entities/categorie-my-suffix/categorie-my-suffix.model';
import { CategorieMySuffixService } from 'app/entities/categorie-my-suffix/service/categorie-my-suffix.service';

@Component({
  selector: 'jhi-article-my-suffix-update',
  templateUrl: './article-my-suffix-update.component.html',
})
export class ArticleMySuffixUpdateComponent implements OnInit {
  isSaving = false;
  article: IArticleMySuffix | null = null;

  categoriesSharedCollection: ICategorieMySuffix[] = [];

  editForm: ArticleMySuffixFormGroup = this.articleFormService.createArticleMySuffixFormGroup();

  constructor(
    protected articleService: ArticleMySuffixService,
    protected articleFormService: ArticleMySuffixFormService,
    protected categorieService: CategorieMySuffixService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareCategorieMySuffix = (o1: ICategorieMySuffix | null, o2: ICategorieMySuffix | null): boolean =>
    this.categorieService.compareCategorieMySuffix(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ article }) => {
      this.article = article;
      if (article) {
        this.updateForm(article);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const article = this.articleFormService.getArticleMySuffix(this.editForm);
    if (article.id !== null) {
      this.subscribeToSaveResponse(this.articleService.update(article));
    } else {
      this.subscribeToSaveResponse(this.articleService.create(article));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IArticleMySuffix>>): void {
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

  protected updateForm(article: IArticleMySuffix): void {
    this.article = article;
    this.articleFormService.resetForm(this.editForm, article);

    this.categoriesSharedCollection = this.categorieService.addCategorieMySuffixToCollectionIfMissing<ICategorieMySuffix>(
      this.categoriesSharedCollection,
      article.categorie
    );
  }

  protected loadRelationshipsOptions(): void {
    this.categorieService
      .query()
      .pipe(map((res: HttpResponse<ICategorieMySuffix[]>) => res.body ?? []))
      .pipe(
        map((categories: ICategorieMySuffix[]) =>
          this.categorieService.addCategorieMySuffixToCollectionIfMissing<ICategorieMySuffix>(categories, this.article?.categorie)
        )
      )
      .subscribe((categories: ICategorieMySuffix[]) => (this.categoriesSharedCollection = categories));
  }
}
