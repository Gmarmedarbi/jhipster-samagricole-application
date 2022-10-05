import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICategorieMySuffix } from '../categorie-my-suffix.model';
import { CategorieMySuffixService } from '../service/categorie-my-suffix.service';

@Injectable({ providedIn: 'root' })
export class CategorieMySuffixRoutingResolveService implements Resolve<ICategorieMySuffix | null> {
  constructor(protected service: CategorieMySuffixService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICategorieMySuffix | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((categorie: HttpResponse<ICategorieMySuffix>) => {
          if (categorie.body) {
            return of(categorie.body);
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
