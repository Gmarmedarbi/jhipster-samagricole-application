import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IArticleMySuffix } from '../article-my-suffix.model';
import { ArticleMySuffixService } from '../service/article-my-suffix.service';

@Injectable({ providedIn: 'root' })
export class ArticleMySuffixRoutingResolveService implements Resolve<IArticleMySuffix | null> {
  constructor(protected service: ArticleMySuffixService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IArticleMySuffix | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((article: HttpResponse<IArticleMySuffix>) => {
          if (article.body) {
            return of(article.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
