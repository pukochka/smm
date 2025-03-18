export interface DataStore {
  user: SMMUser;
  systemUser: SystemUser;

  staticSelected: {
    social: SMMSocial | null;
    category: SMMCategory | null;
    type: SMMType | null;

    favorite: SMMType | null;
    favoriteArrange: SMMType | null;
    repeat: SMMOrder | null;
  };
  fieldsValues: any;
  ordersPanel: OrderPanels;

  _social: SMMSocial[];
  _categories: Record<number, SMMCategory>;
  _types: any;

  _orders: SMMOrder[];
  _selectedOrder: SMMOrder;

  favorites: SMMType[];
  unFavorites: SMMType[];
  isSaved: boolean;
}

export type OrderPanels = 'new_order' | 'favorites' | 'repeat';
