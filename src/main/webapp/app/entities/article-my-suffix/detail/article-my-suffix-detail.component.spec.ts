import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ArticleMySuffixDetailComponent } from './article-my-suffix-detail.component';

describe('ArticleMySuffix Management Detail Component', () => {
  let comp: ArticleMySuffixDetailComponent;
  let fixture: ComponentFixture<ArticleMySuffixDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleMySuffixDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ article: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ArticleMySuffixDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ArticleMySuffixDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load article on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.article).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
