export interface StatesStore {
  dialogs: Record<DialogsNames, boolean>;
  loadings: Record<keyof SMMQueries, boolean> & {
    start: boolean;
    whiteList: boolean;
  };
  tabs: TabNames;
}

export type TabNames = 'newOrder' | 'orders' | 'profile';
export type DialogsNames = 'count' | 'desc' | 'range' | 'order' | 'clear';
