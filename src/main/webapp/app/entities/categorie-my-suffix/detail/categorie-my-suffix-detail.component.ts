import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICategorieMySuffix } from '../categorie-my-suffix.model';

@Component({
  selector: 'jhi-categorie-my-suffix-detail',
  templateUrl: './categorie-my-suffix-detail.component.html',
})
export class CategorieMySuffixDetailComponent implements OnInit {
  categorie: ICategorieMySuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ categorie }) => {
      this.categorie = categorie;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
