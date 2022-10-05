import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IArticleMySuffix } from '../article-my-suffix.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../article-my-suffix.test-samples';

import { ArticleMySuffixService, RestArticleMySuffix } from './article-my-suffix.service';

const requireRestSample: RestArticleMySuffix = {
  ...sampleWithRequiredData,
  tVA: sampleWithRequiredData.tVA?.toJSON(),
};

describe('ArticleMySuffix Service', () => {
  let service: ArticleMySuffixService;
  let httpMock: HttpTestingController;
  let expectedResult: IArticleMySuffix | IArticleMySuffix[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ArticleMySuffixService);
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

    it('should create a ArticleMySuffix', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const article = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(article).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ArticleMySuffix', () => {
      const article = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(article).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ArticleMySuffix', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ArticleMySuffix', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ArticleMySuffix', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addArticleMySuffixToCollectionIfMissing', () => {
      it('should add a ArticleMySuffix to an empty array', () => {
        const article: IArticleMySuffix = sampleWithRequiredData;
        expectedResult = service.addArticleMySuffixToCollectionIfMissing([], article);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(article);
      });

      it('should not add a ArticleMySuffix to an array that contains it', () => {
        const article: IArticleMySuffix = sampleWithRequiredData;
        const articleCollection: IArticleMySuffix[] = [
          {
            ...article,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addArticleMySuffixToCollectionIfMissing(articleCollection, article);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ArticleMySuffix to an array that doesn't contain it", () => {
        const article: IArticleMySuffix = sampleWithRequiredData;
        const articleCollection: IArticleMySuffix[] = [sampleWithPartialData];
        expectedResult = service.addArticleMySuffixToCollectionIfMissing(articleCollection, article);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(article);
      });

      it('should add only unique ArticleMySuffix to an array', () => {
        const articleArray: IArticleMySuffix[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const articleCollection: IArticleMySuffix[] = [sampleWithRequiredData];
        expectedResult = service.addArticleMySuffixToCollectionIfMissing(articleCollection, ...articleArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const article: IArticleMySuffix = sampleWithRequiredData;
        const article2: IArticleMySuffix = sampleWithPartialData;
        expectedResult = service.addArticleMySuffixToCollectionIfMissing([], article, article2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(article);
        expect(expectedResult).toContain(article2);
      });

      it('should accept null and undefined values', () => {
        const article: IArticleMySuffix = sampleWithRequiredData;
        expectedResult = service.addArticleMySuffixToCollectionIfMissing([], null, article, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(article);
      });

      it('should return initial array if no ArticleMySuffix is added', () => {
        const articleCollection: IArticleMySuffix[] = [sampleWithRequiredData];
        expectedResult = service.addArticleMySuffixToCollectionIfMissing(articleCollection, undefined, null);
        expect(expectedResult).toEqual(articleCollection);
      });
    });

    describe('compareArticleMySuffix', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareArticleMySuffix(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareArticleMySuffix(entity1, entity2);
        const compareResult2 = service.compareArticleMySuffix(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareArticleMySuffix(entity1, entity2);
        const compareResult2 = service.compareArticleMySuffix(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareArticleMySuffix(entity1, entity2);
        const compareResult2 = service.compareArticleMySuffix(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
