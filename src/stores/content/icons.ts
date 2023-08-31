import {
  mdiTwitch,
  mdiTwitter,
  mdiSpotify,
  mdiFacebook,
  mdiYoutube,
  mdiInstagram,
  mdiWeb,
} from '@quasar/extras/mdi-v7';

import {
  fabDiscord,
  fabTiktok,
  fabTelegram,
  fabVk,
} from '@quasar/extras/fontawesome-v6';

export const icons: Record<number, { icon: any; color: string }> = {
  1: { icon: fabTelegram, color: 'blue' },
  2: { icon: mdiYoutube, color: 'red' },
  3: { icon: fabDiscord, color: 'deep-purple-5' },
  4: { icon: mdiTwitch, color: 'deep-purple-13' },
  5: { icon: mdiInstagram, color: 'pink-5' },
  6: { icon: fabVk, color: 'blue' },
  7: { icon: mdiSpotify, color: 'green' },
  8: { icon: mdiWeb, color: 'primary' },
  9: { icon: mdiFacebook, color: 'blue' },
  10: { icon: fabTiktok, color: 'primary' },
  11: { icon: mdiTwitter, color: 'blue' },
};
