import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CategorieMySuffixDetailComponent } from './categorie-my-suffix-detail.component';

describe('CategorieMySuffix Management Detail Component', () => {
  let comp: CategorieMySuffixDetailComponent;
  let fixture: ComponentFixture<CategorieMySuffixDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategorieMySuffixDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ categorie: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(CategorieMySuffixDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CategorieMySuffixDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load categorie on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.categorie).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
