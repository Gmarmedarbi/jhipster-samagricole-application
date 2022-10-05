export interface ICategorieMySuffix {
  id: number;
  code?: string | null;
  libelle?: string | null;
}

export type NewCategorieMySuffix = Omit<ICategorieMySuffix, 'id'> & { id: null };
