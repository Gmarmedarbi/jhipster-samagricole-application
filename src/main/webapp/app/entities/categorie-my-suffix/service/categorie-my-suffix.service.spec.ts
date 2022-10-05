import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICategorieMySuffix } from '../categorie-my-suffix.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../categorie-my-suffix.test-samples';

import { CategorieMySuffixService } from './categorie-my-suffix.service';

const requireRestSample: ICategorieMySuffix = {
  ...sampleWithRequiredData,
};

describe('CategorieMySuffix Service', () => {
  let service: CategorieMySuffixService;
  let httpMock: HttpTestingController;
  let expectedResult: ICategorieMySuffix | ICategorieMySuffix[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CategorieMySuffixService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a CategorieMySuffix', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const categorie = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(categorie).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CategorieMySuffix', () => {
      const categorie = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(categorie).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CategorieMySuffix', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CategorieMySuffix', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CategorieMySuffix', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCategorieMySuffixToCollectionIfMissing', () => {
      it('should add a CategorieMySuffix to an empty array', () => {
        const categorie: ICategorieMySuffix = sampleWithRequiredData;
        expectedResult = service.addCategorieMySuffixToCollectionIfMissing([], categorie);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(categorie);
      });

      it('should not add a CategorieMySuffix to an array that contains it', () => {
        const categorie: ICategorieMySuffix = sampleWithRequiredData;
        const categorieCollection: ICategorieMySuffix[] = [
          {
            ...categorie,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCategorieMySuffixToCollectionIfMissing(categorieCollection, categorie);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CategorieMySuffix to an array that doesn't contain it", () => {
        const categorie: ICategorieMySuffix = sampleWithRequiredData;
        const categorieCollection: ICategorieMySuffix[] = [sampleWithPartialData];
        expectedResult = service.addCategorieMySuffixToCollectionIfMissing(categorieCollection, categorie);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(categorie);
      });

      it('should add only unique CategorieMySuffix to an array', () => {
        const categorieArray: ICategorieMySuffix[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const categorieCollection: ICategorieMySuffix[] = [sampleWithRequiredData];
        expectedResult = service.addCategorieMySuffixToCollectionIfMissing(categorieCollection, ...categorieArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const categorie: ICategorieMySuffix = sampleWithRequiredData;
        const categorie2: ICategorieMySuffix = sampleWithPartialData;
        expectedResult = service.addCategorieMySuffixToCollectionIfMissing([], categorie, categorie2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(categorie);
        expect(expectedResult).toContain(categorie2);
      });

      it('should accept null and undefined values', () => {
        const categorie: ICategorieMySuffix = sampleWithRequiredData;
        expectedResult = service.addCategorieMySuffixToCollectionIfMissing([], null, categorie, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(categorie);
      });

      it('should return initial array if no CategorieMySuffix is added', () => {
        const categorieCollection: ICategorieMySuffix[] = [sampleWithRequiredData];
        expectedResult = service.addCategorieMySuffixToCollectionIfMissing(categorieCollection, undefined, null);
        expect(expectedResult).toEqual(categorieCollection);
      });
    });

    describe('compareCategorieMySuffix', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCategorieMySuffix(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCategorieMySuffix(entity1, entity2);
        const compareResult2 = service.compareCategorieMySuffix(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCategorieMySuffix(entity1, entity2);
        const compareResult2 = service.compareCategorieMySuffix(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCategorieMySuffix(entity1, entity2);
        const compareResult2 = service.compareCategorieMySuffix(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
