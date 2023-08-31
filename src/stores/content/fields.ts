import { computed } from 'vue';
import { useLang } from 'src/utils/use/useLang';

export const fields = computed((): Record<SMMTypeVar, SMMFieldsSchema[]> => {
  return {
    '': [],
    Default: [
      {
        type: 'text',
        label: useLang().link,
        param: 'link',
      },
      {
        type: 'count',
        label: useLang().quantity,
        param: 'quantity',
      },
      {
        type: 'number',
        label: useLang().runs,
        param: 'runs',
        optional: true,
      },
      {
        type: 'number',
        label: useLang().interval,
        param: 'interval',
        optional: true,
      },
    ],
    Package: [
      {
        type: 'text',
        label: useLang().link,
        param: 'link',
      },
    ],
    'Custom Comments': [
      {
        type: 'text',
        label: useLang().link,
        param: 'link',
      },
      {
        type: 'textarea',
        label: useLang().comments,
        param: 'comments',
      },
    ],
    'Mentions User Followers': [
      {
        type: 'text',
        label: useLang().launch,
        param: 'link',
      },
      {
        type: 'count',
        label: useLang().quantity,
        param: 'quantity',
      },
      {
        type: 'text',
        label: useLang().username,
        param: 'username',
      },
    ],
    'Custom Comments Package': [
      {
        type: 'text',
        label: useLang().link,
        param: 'link',
      },
      {
        type: 'textarea',
        label: useLang().comments,
        param: 'comments',
      },
    ],
    Poll: [
      {
        type: 'text',
        label: useLang().link,
        param: 'link',
      },
      {
        type: 'count',
        label: useLang().quantity,
        param: 'quantity',
      },
      {
        type: 'text',
        label: useLang().answer_number,
        param: 'answer_number',
      },
    ],
    Subscriptions: [
      {
        type: 'text',
        label: useLang().user,
        param: 'username',
      },
      {
        type: 'range',
        label: useLang().minmax,
        param: 'minmax',
      },
      {
        type: 'delay',
        label: useLang().delay,
        param: 'delay',
      },
      {
        type: 'number',
        label: useLang().posts,
        caption: useLang().posts_caption,
        param: 'posts',
        optional: true,
      },
      {
        type: 'number',
        label: useLang().old_posts,
        caption: useLang().old_posts_caption,
        param: 'old_posts',
        optional: true,
      },
      {
        type: 'date',
        label: useLang().expiry,
        param: 'expiry',
        optional: true,
      },
    ],
  };
});
