import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ArticleMySuffixFormService } from './article-my-suffix-form.service';
import { ArticleMySuffixService } from '../service/article-my-suffix.service';
import { IArticleMySuffix } from '../article-my-suffix.model';
import { ICategorieMySuffix } from 'app/entities/categorie-my-suffix/categorie-my-suffix.model';
import { CategorieMySuffixService } from 'app/entities/categorie-my-suffix/service/categorie-my-suffix.service';

import { ArticleMySuffixUpdateComponent } from './article-my-suffix-update.component';

describe('ArticleMySuffix Management Update Component', () => {
  let comp: ArticleMySuffixUpdateComponent;
  let fixture: ComponentFixture<ArticleMySuffixUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let articleFormService: ArticleMySuffixFormService;
  let articleService: ArticleMySuffixService;
  let categorieService: CategorieMySuffixService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ArticleMySuffixUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ArticleMySuffixUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ArticleMySuffixUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    articleFormService = TestBed.inject(ArticleMySuffixFormService);
    articleService = TestBed.inject(ArticleMySuffixService);
    categorieService = TestBed.inject(CategorieMySuffixService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call CategorieMySuffix query and add missing value', () => {
      const article: IArticleMySuffix = { id: 456 };
      const categorie: ICategorieMySuffix = { id: 72279 };
      article.categorie = categorie;

      const categorieCollection: ICategorieMySuffix[] = [{ id: 68937 }];
      jest.spyOn(categorieService, 'query').mockReturnValue(of(new HttpResponse({ body: categorieCollection })));
      const additionalCategorieMySuffixes = [categorie];
      const expectedCollection: ICategorieMySuffix[] = [...additionalCategorieMySuffixes, ...categorieCollection];
      jest.spyOn(categorieService, 'addCategorieMySuffixToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ article });
      comp.ngOnInit();

      expect(categorieService.query).toHaveBeenCalled();
      expect(categorieService.addCategorieMySuffixToCollectionIfMissing).toHaveBeenCalledWith(
        categorieCollection,
        ...additionalCategorieMySuffixes.map(expect.objectContaining)
      );
      expect(comp.categoriesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const article: IArticleMySuffix = { id: 456 };
      const categorie: ICategorieMySuffix = { id: 65625 };
      article.categorie = categorie;

      activatedRoute.data = of({ article });
      comp.ngOnInit();

      expect(comp.categoriesSharedCollection).toContain(categorie);
      expect(comp.article).toEqual(article);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IArticleMySuffix>>();
      const article = { id: 123 };
      jest.spyOn(articleFormService, 'getArticleMySuffix').mockReturnValue(article);
      jest.spyOn(articleService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ article });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: article }));
      saveSubject.complete();

      // THEN
      expect(articleFormService.getArticleMySuffix).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(articleService.update).toHaveBeenCalledWith(expect.objectContaining(article));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IArticleMySuffix>>();
      const article = { id: 123 };
      jest.spyOn(articleFormService, 'getArticleMySuffix').mockReturnValue({ id: null });
      jest.spyOn(articleService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ article: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: article }));
      saveSubject.complete();

      // THEN
      expect(articleFormService.getArticleMySuffix).toHaveBeenCalled();
      expect(articleService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IArticleMySuffix>>();
      const article = { id: 123 };
      jest.spyOn(articleService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ article });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(articleService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareCategorieMySuffix', () => {
      it('Should forward to categorieService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(categorieService, 'compareCategorieMySuffix');
        comp.compareCategorieMySuffix(entity, entity2);
        expect(categorieService.compareCategorieMySuffix).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
