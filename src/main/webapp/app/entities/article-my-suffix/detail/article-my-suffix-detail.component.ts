import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IArticleMySuffix } from '../article-my-suffix.model';

@Component({
  selector: 'jhi-article-my-suffix-detail',
  templateUrl: './article-my-suffix-detail.component.html',
})
export class ArticleMySuffixDetailComponent implements OnInit {
  article: IArticleMySuffix | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ article }) => {
      this.article = article;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
