import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IArticleMySuffix, NewArticleMySuffix } from '../article-my-suffix.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IArticleMySuffix for edit and NewArticleMySuffixFormGroupInput for create.
 */
type ArticleMySuffixFormGroupInput = IArticleMySuffix | PartialWithRequiredKeyOf<NewArticleMySuffix>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IArticleMySuffix | NewArticleMySuffix> = Omit<T, 'tVA'> & {
  tVA?: string | null;
};

type ArticleMySuffixFormRawValue = FormValueOf<IArticleMySuffix>;

type NewArticleMySuffixFormRawValue = FormValueOf<NewArticleMySuffix>;

type ArticleMySuffixFormDefaults = Pick<NewArticleMySuffix, 'id' | 'tVA'>;

type ArticleMySuffixFormGroupContent = {
  id: FormControl<ArticleMySuffixFormRawValue['id'] | NewArticleMySuffix['id']>;
  code: FormControl<ArticleMySuffixFormRawValue['code']>;
  libelle: FormControl<ArticleMySuffixFormRawValue['libelle']>;
  pUHT: FormControl<ArticleMySuffixFormRawValue['pUHT']>;
  tVA: FormControl<ArticleMySuffixFormRawValue['tVA']>;
  pUTTC: FormControl<ArticleMySuffixFormRawValue['pUTTC']>;
  categorie: FormControl<ArticleMySuffixFormRawValue['categorie']>;
};

export type ArticleMySuffixFormGroup = FormGroup<ArticleMySuffixFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ArticleMySuffixFormService {
  createArticleMySuffixFormGroup(article: ArticleMySuffixFormGroupInput = { id: null }): ArticleMySuffixFormGroup {
    const articleRawValue = this.convertArticleMySuffixToArticleMySuffixRawValue({
      ...this.getFormDefaults(),
      ...article,
    });
    return new FormGroup<ArticleMySuffixFormGroupContent>({
      id: new FormControl(
        { value: articleRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      code: new FormControl(articleRawValue.code),
      libelle: new FormControl(articleRawValue.libelle),
      pUHT: new FormControl(articleRawValue.pUHT),
      tVA: new FormControl(articleRawValue.tVA),
      pUTTC: new FormControl(articleRawValue.pUTTC),
      categorie: new FormControl(articleRawValue.categorie),
    });
  }

  getArticleMySuffix(form: ArticleMySuffixFormGroup): IArticleMySuffix | NewArticleMySuffix {
    return this.convertArticleMySuffixRawValueToArticleMySuffix(
      form.getRawValue() as ArticleMySuffixFormRawValue | NewArticleMySuffixFormRawValue
    );
  }

  resetForm(form: ArticleMySuffixFormGroup, article: ArticleMySuffixFormGroupInput): void {
    const articleRawValue = this.convertArticleMySuffixToArticleMySuffixRawValue({ ...this.getFormDefaults(), ...article });
    form.reset(
      {
        ...articleRawValue,
        id: { value: articleRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ArticleMySuffixFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      tVA: currentTime,
    };
  }

  private convertArticleMySuffixRawValueToArticleMySuffix(
    rawArticleMySuffix: ArticleMySuffixFormRawValue | NewArticleMySuffixFormRawValue
  ): IArticleMySuffix | NewArticleMySuffix {
    return {
      ...rawArticleMySuffix,
      tVA: dayjs(rawArticleMySuffix.tVA, DATE_TIME_FORMAT),
    };
  }

  private convertArticleMySuffixToArticleMySuffixRawValue(
    article: IArticleMySuffix | (Partial<NewArticleMySuffix> & ArticleMySuffixFormDefaults)
  ): ArticleMySuffixFormRawValue | PartialWithRequiredKeyOf<NewArticleMySuffixFormRawValue> {
    return {
      ...article,
      tVA: article.tVA ? article.tVA.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
