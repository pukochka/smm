import { useDataStore } from 'stores/data/dataStore';
import { enScheme } from '../lang/en';
import { ruScheme } from '../lang/ru';

export const useLang = () => {
  const data = useDataStore();

  return data.user.language === 'eng' ? enScheme : ruScheme;
};
