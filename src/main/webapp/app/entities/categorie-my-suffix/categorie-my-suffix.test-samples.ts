import { ICategorieMySuffix, NewCategorieMySuffix } from './categorie-my-suffix.model';

export const sampleWithRequiredData: ICategorieMySuffix = {
  id: 37918,
};

export const sampleWithPartialData: ICategorieMySuffix = {
  id: 48523,
  libelle: 'Dollar calculating Specialiste',
};

export const sampleWithFullData: ICategorieMySuffix = {
  id: 85937,
  code: 'redundant bifurcated Plastic',
  libelle: 'systems',
};

export const sampleWithNewData: NewCategorieMySuffix = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
