import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IArticleMySuffix, NewArticleMySuffix } from '../article-my-suffix.model';

export type PartialUpdateArticleMySuffix = Partial<IArticleMySuffix> & Pick<IArticleMySuffix, 'id'>;

type RestOf<T extends IArticleMySuffix | NewArticleMySuffix> = Omit<T, 'tVA'> & {
  tVA?: string | null;
};

export type RestArticleMySuffix = RestOf<IArticleMySuffix>;

export type NewRestArticleMySuffix = RestOf<NewArticleMySuffix>;

export type PartialUpdateRestArticleMySuffix = RestOf<PartialUpdateArticleMySuffix>;

export type EntityResponseType = HttpResponse<IArticleMySuffix>;
export type EntityArrayResponseType = HttpResponse<IArticleMySuffix[]>;

@Injectable({ providedIn: 'root' })
export class ArticleMySuffixService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/articles');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(article: NewArticleMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(article);
    return this.http
      .post<RestArticleMySuffix>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(article: IArticleMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(article);
    return this.http
      .put<RestArticleMySuffix>(`${this.resourceUrl}/${this.getArticleMySuffixIdentifier(article)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(article: PartialUpdateArticleMySuffix): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(article);
    return this.http
      .patch<RestArticleMySuffix>(`${this.resourceUrl}/${this.getArticleMySuffixIdentifier(article)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestArticleMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestArticleMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getArticleMySuffixIdentifier(article: Pick<IArticleMySuffix, 'id'>): number {
    return article.id;
  }

  compareArticleMySuffix(o1: Pick<IArticleMySuffix, 'id'> | null, o2: Pick<IArticleMySuffix, 'id'> | null): boolean {
    return o1 && o2 ? this.getArticleMySuffixIdentifier(o1) === this.getArticleMySuffixIdentifier(o2) : o1 === o2;
  }

  addArticleMySuffixToCollectionIfMissing<Type extends Pick<IArticleMySuffix, 'id'>>(
    articleCollection: Type[],
    ...articlesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const articles: Type[] = articlesToCheck.filter(isPresent);
    if (articles.length > 0) {
      const articleCollectionIdentifiers = articleCollection.map(articleItem => this.getArticleMySuffixIdentifier(articleItem)!);
      const articlesToAdd = articles.filter(articleItem => {
        const articleIdentifier = this.getArticleMySuffixIdentifier(articleItem);
        if (articleCollectionIdentifiers.includes(articleIdentifier)) {
          return false;
        }
        articleCollectionIdentifiers.push(articleIdentifier);
        return true;
      });
      return [...articlesToAdd, ...articleCollection];
    }
    return articleCollection;
  }

  protected convertDateFromClient<T extends IArticleMySuffix | NewArticleMySuffix | PartialUpdateArticleMySuffix>(article: T): RestOf<T> {
    return {
      ...article,
      tVA: article.tVA?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restArticleMySuffix: RestArticleMySuffix): IArticleMySuffix {
    return {
      ...restArticleMySuffix,
      tVA: restArticleMySuffix.tVA ? dayjs(restArticleMySuffix.tVA) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestArticleMySuffix>): HttpResponse<IArticleMySuffix> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestArticleMySuffix[]>): HttpResponse<IArticleMySuffix[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
