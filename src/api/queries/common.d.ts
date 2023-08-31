declare interface PublicKey {
  /**
   * Публичный ключ модуля
   * */
  public_key: string;
}

declare interface SecretKey {
  /**
   * Приватный ключ пользователя(GET string)
   * */
  user_secret_key: string;
}

declare type SMMCommonParams = SecretKey & PublicKey;

declare interface SMMUserIdParam {
  /**
   * id пользователя
   * */
  user_id: number;
}

declare interface SMMLanguageParam {
  /**
   * Язык ( eng или ru )
   * */
  language: string;
}

declare interface SMMOrderIdParam {
  /**
   * id зазака
   * */
  order_id: number;
}

/**
 * Запросы для получения данных
 * */
declare interface SMMCommonQueries {
  /**
   * Возвращает настройку модуля
   * */
  getSettings: PublicKey;

  /**
   * Получение пользователя
   * */
  getUser: SMMUserIdParam;

  /**
   * Задать язык
   * */
  setLanguage: SMMLanguageParam & SMMUserIdParam & SecretKey;
}
