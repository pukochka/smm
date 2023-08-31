import {
  mdiAccount,
  mdiOrderBoolAscending,
  mdiNewspaper,
} from '@quasar/extras/mdi-v7';
import { computed, markRaw } from 'vue';
import { useLang } from 'src/utils/use/useLang';

import OrderPanel from 'src/panels/OrderPanel.vue';
import OrdersPanel from 'src/panels/OrdersPanel.vue';
import ProfilePanel from 'src/panels/ProfilePanel.vue';

export const tabs = computed(() => [
  {
    name: 'newOrder',
    label: useLang().newOrder,
    icon: mdiNewspaper,
    component: markRaw(OrderPanel),
  },
  {
    name: 'orders',
    label: useLang().orders,
    icon: mdiOrderBoolAscending,
    component: markRaw(OrdersPanel),
  },
  {
    name: 'profile',
    label: useLang().profile,
    icon: mdiAccount,
    component: markRaw(ProfilePanel),
  },
]);

export const lang = [
  {
    label: 'Русский',
    symbol: 'ru',
  },
  {
    label: 'English',
    symbol: 'eng',
  },
];
