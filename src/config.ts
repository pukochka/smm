import { getQueryParam } from 'src/utils/string';

export default {
  domain: 'https://soc-proofback.bot-t.com/',
  domain_bott: 'https://api.bot-t.com/v1/',

  bot_id: getQueryParam('bot_id') ?? 0,
  public_key: getQueryParam('public_key') ?? '',

  dark: window.Telegram.WebApp.colorScheme === 'dark',
};
