import dayjs from 'dayjs/esm';
import { ICategorieMySuffix } from 'app/entities/categorie-my-suffix/categorie-my-suffix.model';

export interface IArticleMySuffix {
  id: number;
  code?: string | null;
  libelle?: string | null;
  pUHT?: string | null;
  tVA?: dayjs.Dayjs | null;
  pUTTC?: number | null;
  categorie?: Pick<ICategorieMySuffix, 'id'> | null;
}

export type NewArticleMySuffix = Omit<IArticleMySuffix, 'id'> & { id: null };
