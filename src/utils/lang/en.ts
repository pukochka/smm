const statuses: Record<SMMOrderStatuses, string> = {
  all: 'All',
  Pending: 'Waiting',
  Partial: 'In progress',
  'In progress': 'In progress',
  Completed: 'Completed',
  Canceled: 'Canceled',
  Old: 'Outdated',
};

const errs = {
  'neworder.error.link_duplicate':
    'Error creating a new order - the link is duplicated',
};

export const enScheme = {
  newOrder: 'New order',
  orders: 'Orders',
  profile: 'Profile',
  user_value: 'User',
  balance: 'Balance',

  favourites: 'Favourites',
  search: 'Search...',
  delete: 'Delete',
  deleteF: 'favourites',
  fav_notify: "You don't have favorites yet",

  delete_notify: 'Are you sure you want to delete all your favorites?',
  confirmF: 'Confirm',
  arrange: 'Arrange',
  not_found: 'Nothing was found...',
  add_fav: 'added to favorites',
  del_fav: 'removed from favorites',
  behind: 'Behind',

  service: 'Service',
  category: 'Category',
  type: 'Type',

  link: 'Link',
  quantity: 'Quantity',
  runs: 'Launches',
  interval: 'Interval in minutes',

  comments: 'List of comments separated by characters',
  username: 'URL for deleting subscribers',
  user: 'Login',

  answer_number: 'Option number',

  minmax: 'Range',
  delay: 'Delay',
  old_posts: 'Number of old posts',
  old_posts_caption:
    'The number of existing records that will be analyzed and for which orders will be created can be used if this option is available for the service.',
  posts: 'Number of future posts',
  posts_caption:
    'Use this parameter if you want to limit the number of new (future) records that will be analyzed and for which orders will be created. If the input field is empty, a subscription will be created for an unlimited number of records.',
  expiry: 'Expiration date',

  count_select: 'Enter your number',
  range_select: 'Enter your range',
  date_select: 'Select a date',

  notify: 'Notification',
  service_notify: 'You need to select a service',
  orders_notify: "You don't have any orders yet",
  orders_pend_notify: "You don't have any orders pending yet",
  orders_comp_notify: "You don't have completed orders yet",
  orders_part_notify: "You don't have any running orders yet",
  desc_notify:
    'Before launching, it is recommended to read the description of the service',
  date_notify: 'No date selected',
  create_new: 'Create new order',
  input_notify: 'Enter the correct amount!',

  optional_field: '(optional field)',

  launch: 'To run',
  desc: 'Description of the service',
  addiction: 'Additional parameters',

  from: 'from',
  to: 'to',

  cancel: 'Cancel',
  close: 'Close',
  confirm: 'Apply',
  details: 'Details',
  next: 'Next',
  prev: 'Prev',

  order: 'Order',
  date: 'Launch date',
  order_service: 'Service',
  cost: 'Price',
  rate: 'Price per 1000',
  total: 'Total',
  status: 'Status',
  remains: 'It remains to execute',
  start_count: 'Initial quantity',
  max: 'Max quantity',
  min: 'Min quantity',

  no_results: 'No results...',
  orders_completed: 'Completed',
  whiteList: 'The service is disabled by the administrator',

  statuses: statuses,
  errs: errs,
};
