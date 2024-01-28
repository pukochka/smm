/**
 * Сущность пользователя системы bott
 * */
declare interface SystemUser {
  id: number;
  bot_id: number;
  user: {
    id: number;
    telegram_id: number;
    username: string;
    first_name: string;
    last_name: string;
    link: string;
    type: string;
  };
  ref: null;
  money: number;
  status: number;
  create_at: number;
  update_at: number;
  secret_user_key: string;
}

/**
 * Сущность пользователя для приложения
 * */
declare interface SMMUser {
  /**
   * идентификатор пользователя ( tg_id )
   * */
  id: number;
  /**
   * (ru или eng)
   * */
  language: string;
}

/**
 * Сущность пользователя для приложения
 * */
declare interface SMMSocial {
  /**
   *
   * */
  id: number;
  /**
   *
   * */
  image: string;
  /**
   *
   * */
  name_en: string;
  /**
   *
   * */
  name_ru: string;
}

declare interface SMMCategory {
  /**
   *
   * */
  name_category: string;
}

/**
 * Сущность пользователя для приложения
 * */
declare interface SMMType {
  /**
   *
   * */
  type_id: string;
  /**
   *
   * */
  name: string;
  /**
   *
   * */
  min: string;
  /**
   *
   * */
  max: string;
  /**
   *
   * */
  rate: number;
  /**
   *
   * */
  type: SMMTypeVar;
  /**
   *
   * */
  desc_eng: string;
  /**
   *
   * */
  desc_ru: string;
}

declare interface SMMOrder {
  /**
   * ID заказа с сервиса
   * */
  id: number;
  /**
   * ссылка на ресурс
   * */
  link: string;
  /**
   * итоговая цена
   * */
  cost: number;
  /**
   * название типа товара
   * */
  type_name: string;
  /**
   * начальное количество заказа
   * */
  start_count: string;
  /**
   * осталось выполнить
   * */
  remains: string;
  /**
   * статус заказа (Pending - Ожидание, Partial - в процессе, Completed - выполнен)
   * */
  status: SMMOrderStatuses;
  /**
   * дата создания заказа
   * */
  created_at: number;
  /**
   *
   * */
  type: SMMTypeVar;
  /**
   *
   * */
  type_id: string;
}

declare type SMMOrderStatuses =
  | 'all'
  | 'Pending'
  | 'Partial'
  | 'In progress'
  | 'Completed'
  | 'Old'
  | 'Canceled';

declare interface SMMFieldsSchema {
  type: SMMFieldTypes;
  label: string;
  param: string;
  optional?: boolean;
  caption?: string;
}

declare type SMMFieldTypes =
  | 'text'
  | 'textarea'
  | 'count'
  | 'range'
  | 'date'
  | 'delay'
  | 'number';

declare type SMMTypeVar =
  | ''
  | 'Default'
  | 'Package'
  | 'Custom Comments'
  | 'Mentions User Followers'
  | 'Custom Comments Package'
  | 'Poll'
  | 'Subscriptions';
