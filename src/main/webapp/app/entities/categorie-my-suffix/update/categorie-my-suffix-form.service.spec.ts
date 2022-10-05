import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../categorie-my-suffix.test-samples';

import { CategorieMySuffixFormService } from './categorie-my-suffix-form.service';

describe('CategorieMySuffix Form Service', () => {
  let service: CategorieMySuffixFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategorieMySuffixFormService);
  });

  describe('Service methods', () => {
    describe('createCategorieMySuffixFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCategorieMySuffixFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            code: expect.any(Object),
            libelle: expect.any(Object),
          })
        );
      });

      it('passing ICategorieMySuffix should create a new form with FormGroup', () => {
        const formGroup = service.createCategorieMySuffixFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            code: expect.any(Object),
            libelle: expect.any(Object),
          })
        );
      });
    });

    describe('getCategorieMySuffix', () => {
      it('should return NewCategorieMySuffix for default CategorieMySuffix initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createCategorieMySuffixFormGroup(sampleWithNewData);

        const categorie = service.getCategorieMySuffix(formGroup) as any;

        expect(categorie).toMatchObject(sampleWithNewData);
      });

      it('should return NewCategorieMySuffix for empty CategorieMySuffix initial value', () => {
        const formGroup = service.createCategorieMySuffixFormGroup();

        const categorie = service.getCategorieMySuffix(formGroup) as any;

        expect(categorie).toMatchObject({});
      });

      it('should return ICategorieMySuffix', () => {
        const formGroup = service.createCategorieMySuffixFormGroup(sampleWithRequiredData);

        const categorie = service.getCategorieMySuffix(formGroup) as any;

        expect(categorie).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICategorieMySuffix should not enable id FormControl', () => {
        const formGroup = service.createCategorieMySuffixFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCategorieMySuffix should disable id FormControl', () => {
        const formGroup = service.createCategorieMySuffixFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
