import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../article-my-suffix.test-samples';

import { ArticleMySuffixFormService } from './article-my-suffix-form.service';

describe('ArticleMySuffix Form Service', () => {
  let service: ArticleMySuffixFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleMySuffixFormService);
  });

  describe('Service methods', () => {
    describe('createArticleMySuffixFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createArticleMySuffixFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            code: expect.any(Object),
            libelle: expect.any(Object),
            pUHT: expect.any(Object),
            tVA: expect.any(Object),
            pUTTC: expect.any(Object),
            categorie: expect.any(Object),
          })
        );
      });

      it('passing IArticleMySuffix should create a new form with FormGroup', () => {
        const formGroup = service.createArticleMySuffixFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            code: expect.any(Object),
            libelle: expect.any(Object),
            pUHT: expect.any(Object),
            tVA: expect.any(Object),
            pUTTC: expect.any(Object),
            categorie: expect.any(Object),
          })
        );
      });
    });

    describe('getArticleMySuffix', () => {
      it('should return NewArticleMySuffix for default ArticleMySuffix initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createArticleMySuffixFormGroup(sampleWithNewData);

        const article = service.getArticleMySuffix(formGroup) as any;

        expect(article).toMatchObject(sampleWithNewData);
      });

      it('should return NewArticleMySuffix for empty ArticleMySuffix initial value', () => {
        const formGroup = service.createArticleMySuffixFormGroup();

        const article = service.getArticleMySuffix(formGroup) as any;

        expect(article).toMatchObject({});
      });

      it('should return IArticleMySuffix', () => {
        const formGroup = service.createArticleMySuffixFormGroup(sampleWithRequiredData);

        const article = service.getArticleMySuffix(formGroup) as any;

        expect(article).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IArticleMySuffix should not enable id FormControl', () => {
        const formGroup = service.createArticleMySuffixFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewArticleMySuffix should disable id FormControl', () => {
        const formGroup = service.createArticleMySuffixFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
