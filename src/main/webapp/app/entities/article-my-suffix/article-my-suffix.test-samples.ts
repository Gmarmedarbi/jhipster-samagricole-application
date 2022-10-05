import dayjs from 'dayjs/esm';

import { IArticleMySuffix, NewArticleMySuffix } from './article-my-suffix.model';

export const sampleWithRequiredData: IArticleMySuffix = {
  id: 61675,
};

export const sampleWithPartialData: IArticleMySuffix = {
  id: 93001,
  code: 'Plastic customer analyzing',
  libelle: 'Ngultrum matrix Som',
  pUHT: 'c',
};

export const sampleWithFullData: IArticleMySuffix = {
  id: 19959,
  code: 'Sports Qatar program',
  libelle: 'Ball bricks-and-clicks',
  pUHT: 'copy Rubber de',
  tVA: dayjs('2022-10-05T17:06'),
  pUTTC: 50569,
};

export const sampleWithNewData: NewArticleMySuffix = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
