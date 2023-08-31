import config from 'src/config';
import { boot } from 'quasar/wrappers';
import { Dark } from 'quasar';

import { useLocalColor } from 'src/utils/use/useColor';

import { fetchSMM, fetchUser } from 'boot/queries';

import { vClickable } from 'src/utils/use/v-clickable';

export default boot(async ({ app }) => {
  console.log('o(￣┰￣*)ゞ');

  app.directive('clickable', vClickable);

  Dark.set(config.dark);
  useLocalColor();

  window.Telegram.WebApp.enableClosingConfirmation();

  fetchSMM('getSettings', { public_key: config.public_key }).then();
  fetchUser().then();
});
