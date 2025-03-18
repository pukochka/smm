declare interface SMMSocialParam {
  /**
   * id соц. сети
   * */
  social: number;
}

declare interface SMMNameCategoryParam {
  /**
   * Название категории из запроса выше (передавать строго как получено до этого)
   * */
  name_category: string;
}

declare type SMMTypeParams =
  | 'link'
  | 'quantity'
  | 'runs'
  | 'interval'
  | 'comments'
  | 'username'
  | 'answer_number'
  | 'min'
  | 'max'
  | 'delay'
  | 'posts'
  | 'old_posts'
  | 'expiry';

declare type SMMTypeParamsRecord = Partial<
  Record<SMMTypeParams, string | number>
>;

declare interface SMMLocalQueries {
  /**
   *
   * */
  getSocial: PublicKey;

  /**
   *
   * */
  getCategories: PublicKey & SMMSocialParam;

  /**
   *
   * */
  getTypes: PublicKey & SMMNameCategoryParam;

  /**
   *
   * */
  createOrder: SMMCommonParams & SMMTypeParamsRecord;

  /**
   *
   * */
  getOrder: SMMCommonParams & SMMOrderIdParam & SMMUserIdParam;

  /**
   *
   * */
  orders: SMMCommonParams & SMMUserIdParam;
}

declare type SMMQueries = SMMLocalQueries & SMMCommonQueries;

declare type SMMParams<P extends keyof SMMQueries> = SMMQueries[P];
