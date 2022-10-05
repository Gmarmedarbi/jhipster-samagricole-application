import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICategorieMySuffix, NewCategorieMySuffix } from '../categorie-my-suffix.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICategorieMySuffix for edit and NewCategorieMySuffixFormGroupInput for create.
 */
type CategorieMySuffixFormGroupInput = ICategorieMySuffix | PartialWithRequiredKeyOf<NewCategorieMySuffix>;

type CategorieMySuffixFormDefaults = Pick<NewCategorieMySuffix, 'id'>;

type CategorieMySuffixFormGroupContent = {
  id: FormControl<ICategorieMySuffix['id'] | NewCategorieMySuffix['id']>;
  code: FormControl<ICategorieMySuffix['code']>;
  libelle: FormControl<ICategorieMySuffix['libelle']>;
};

export type CategorieMySuffixFormGroup = FormGroup<CategorieMySuffixFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CategorieMySuffixFormService {
  createCategorieMySuffixFormGroup(categorie: CategorieMySuffixFormGroupInput = { id: null }): CategorieMySuffixFormGroup {
    const categorieRawValue = {
      ...this.getFormDefaults(),
      ...categorie,
    };
    return new FormGroup<CategorieMySuffixFormGroupContent>({
      id: new FormControl(
        { value: categorieRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      code: new FormControl(categorieRawValue.code),
      libelle: new FormControl(categorieRawValue.libelle),
    });
  }

  getCategorieMySuffix(form: CategorieMySuffixFormGroup): ICategorieMySuffix | NewCategorieMySuffix {
    return form.getRawValue() as ICategorieMySuffix | NewCategorieMySuffix;
  }

  resetForm(form: CategorieMySuffixFormGroup, categorie: CategorieMySuffixFormGroupInput): void {
    const categorieRawValue = { ...this.getFormDefaults(), ...categorie };
    form.reset(
      {
        ...categorieRawValue,
        id: { value: categorieRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CategorieMySuffixFormDefaults {
    return {
      id: null,
    };
  }
}
