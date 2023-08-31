export const defaultSystemUser: SystemUser = {
  id: 0,
  bot_id: 0,
  user: {
    id: 0,
    telegram_id: 0,
    username: '',
    first_name: '',
    last_name: '',
    link: '',
    type: '',
  },
  ref: null,
  money: 0,
  status: 0,
  create_at: 0,
  update_at: 0,
  secret_user_key: '',
};

export const defaultUser: SMMUser = {
  id: 0,
  language: 'ru',
};

export const defaultSocial: SMMSocial = {
  id: -1,
  image: '',
  name_en: '',
  name_ru: '',
};

export const defaultType: SMMType = {
  type_id: '',
  type: '',
  name: '',
  rate: 0,
  max: '',
  min: '',
  desc_eng: '',
  desc_ru: '',
};

export const defaultOrder: SMMOrder = {
  id: -1,
  created_at: 0,
  status: 'Completed',
  link: '',
  type_name: '',
  remains: '',
  start_count: '',
  cost: 0,
  type_id: '',
  type: '',
};
