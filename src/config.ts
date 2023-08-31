/**
 * (c) 2023-present
 * Released under the MIT License.
 * Root file
 *
 *  .d888888b.
 * d88    "Y8b           .db               .db
 * 888     888           888               888
 * 888     88            888               888
 * 8888888X     .d8888b. 88888b            88888b         .d88888  .d8888b. .d88888b.
 * 888     88  888  888  888               888           888      888  888 88  88  88
 * 888     888 888  888  888     88888888  888           888      888  888 88  88  88
 * Y88b    888 888  888  888               888     .db.  888      888  888 88  88  88 .db.
 *  "8888888P' "Y8888P'  "Y888P"          "Y888P"  "YP"  "Y8888b. "Y8888P' 88  88  88 "YP"
 *
 *
 * ⣿⣿⠿⠿⣿⠿⣿⠿⠿⠿⣿⣿⡿⠿⠛⠛⠛⠛⠿⣿⣿⣿⣿⣿ ⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠉⠁ ⠉⠻⣿⣿⣿ ⣿⣿⣿⣿⣿⣿⣿⡟⠁⣿⣿⠿⠿⣿⠿⣿⠿⠿⠿⣿⣿⡿⠿⠛⠛⠛⠛⠿⣿⣿⣿⣿⣿ ⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠉⠁ ⠉⠻⣿⣿⣿ ⣿⣿⣿⣿⣿⣿⣿⡟⠁
 * */

import { getQueryParam } from 'src/utils/string';

export default {
  domain: 'https://soc-proofback.bot-t.com/',
  domain_bott: 'https://api.bot-t.com/v1/',

  bot_id: getQueryParam('bot_id') ?? 0,
  public_key: getQueryParam('public_key') ?? '',

  dark: window.Telegram.WebApp.colorScheme === 'dark',
};
