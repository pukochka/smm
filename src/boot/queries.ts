import config from 'src/config';
import { bott, smm } from 'boot/interceptors';
import { useDataStore } from 'stores/data/dataStore';
import { useStatesStore } from 'stores/states/statesStore';

import { getHash } from 'src/utils/string';
import { Quasar } from 'quasar';

import langEn from 'quasar/lang/en-GB';
import langRu from 'quasar/lang/ru';
import { useColor } from 'src/utils/use/useColor';
import { useNotify } from 'src/utils/use/useNotify';

export async function fetchSMM<Q extends keyof SMMQueries>(
  query: Q,
  params?: SMMParams<Q>,
  intercept?: 'social' | 'categories'
) {
  try {
    return await smm({
      url: query,
      params: params,
    }).then((response) => {
      const data = useDataStore();
      const states = useStatesStore();

      if (query === 'getSocial') {
        /** */

        data._social = response.data?.data ?? [];

        /** */
      } else if (query === 'getCategories') {
        /** */

        data._categories = response.data?.data ?? {};

        /** */
      } else if (query === 'getTypes') {
        /** */

        data._types = response.data?.data ?? [];
        if (intercept === 'social') {
          data.staticSelected.category = data.categories[0] ?? null;
          data.staticSelected.type = data.types[0] ?? null;
        } else if (intercept === 'categories') {
          data.staticSelected.type = data.types[0] ?? null;
        }

        states.loadings.whiteList = (response.data?.data ?? []).length === 0;

        /** */
      } else if (query === 'getUser') {
        /** */

        data.user = response.data.data;

        Quasar.lang.set(data.user.language === 'eng' ? langEn : langRu);

        /** */
      } else if (query === 'setLanguage') {
        /** */

        data.user = response.data.data;

        Quasar.lang.set(data.user.language === 'eng' ? langEn : langRu);

        /** */
      } else if (query === 'orders') {
        /** */

        data._orders = response.data.data;

        /** */
      } else if (query === 'getOrder') {
        /** */

        data._selectedOrder = response.data.data;
        states.openDialog('order');

        /** */
      } else if (query === 'getSettings') {
        /** */

        useColor(response.data.data.color);
        data.checkFavorites(response.data.data.black, response.data.data.white);

        /** */
      } else if (query === 'createOrder') {
        /** */

        useNotify('Заказ успешно запущен');
        states.toggleTab('orders');

        /** */
      }
    });
  } catch (e) {}
}

export async function fetchStatic(social: number) {
  const data = useDataStore();

  await fetchSMM('getCategories', {
    social: social,
    public_key: config.public_key,
  }).then();

  return await fetchSMM(
    'getTypes',
    {
      name_category: data._categories[0]?.name_category ?? '',
      public_key: config.public_key,
    },
    'social'
  );
}

export async function fetchUser(short?: boolean) {
  const data = useDataStore();
  try {
    return await bott({
      url: 'module/bot/check-hash',
      data: {
        bot_id: config.bot_id,
        userData: getHash(),
      },
    }).then((response) => {
      const states = useStatesStore();
      data.systemUser = response.data.data;

      if (short) return;

      Promise.all([
        fetchSMM('getUser', {
          user_id: response.data.data?.user?.telegram_id ?? 0,
        }),
        fetchSMM('getSocial'),
      ]).then(() => (states.loadings.start = false));
    });
  } catch (e) {}
}
