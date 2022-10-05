import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICategorieMySuffix, NewCategorieMySuffix } from '../categorie-my-suffix.model';

export type PartialUpdateCategorieMySuffix = Partial<ICategorieMySuffix> & Pick<ICategorieMySuffix, 'id'>;

export type EntityResponseType = HttpResponse<ICategorieMySuffix>;
export type EntityArrayResponseType = HttpResponse<ICategorieMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class CategorieMySuffixService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/categories');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(categorie: NewCategorieMySuffix): Observable<EntityResponseType> {
    return this.http.post<ICategorieMySuffix>(this.resourceUrl, categorie, { observe: 'response' });
  }

  update(categorie: ICategorieMySuffix): Observable<EntityResponseType> {
    return this.http.put<ICategorieMySuffix>(`${this.resourceUrl}/${this.getCategorieMySuffixIdentifier(categorie)}`, categorie, {
      observe: 'response',
    });
  }

  partialUpdate(categorie: PartialUpdateCategorieMySuffix): Observable<EntityResponseType> {
    return this.http.patch<ICategorieMySuffix>(`${this.resourceUrl}/${this.getCategorieMySuffixIdentifier(categorie)}`, categorie, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICategorieMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICategorieMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCategorieMySuffixIdentifier(categorie: Pick<ICategorieMySuffix, 'id'>): number {
    return categorie.id;
  }

  compareCategorieMySuffix(o1: Pick<ICategorieMySuffix, 'id'> | null, o2: Pick<ICategorieMySuffix, 'id'> | null): boolean {
    return o1 && o2 ? this.getCategorieMySuffixIdentifier(o1) === this.getCategorieMySuffixIdentifier(o2) : o1 === o2;
  }

  addCategorieMySuffixToCollectionIfMissing<Type extends Pick<ICategorieMySuffix, 'id'>>(
    categorieCollection: Type[],
    ...categoriesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const categories: Type[] = categoriesToCheck.filter(isPresent);
    if (categories.length > 0) {
      const categorieCollectionIdentifiers = categorieCollection.map(categorieItem => this.getCategorieMySuffixIdentifier(categorieItem)!);
      const categoriesToAdd = categories.filter(categorieItem => {
        const categorieIdentifier = this.getCategorieMySuffixIdentifier(categorieItem);
        if (categorieCollectionIdentifiers.includes(categorieIdentifier)) {
          return false;
        }
        categorieCollectionIdentifiers.push(categorieIdentifier);
        return true;
      });
      return [...categoriesToAdd, ...categorieCollection];
    }
    return categorieCollection;
  }
}
