import { Dialog } from 'quasar';
import { useLang } from 'src/utils/use/useLang';

export function useDialog(message: string) {
  Dialog.create({
    message: message,
    title: useLang().notify,
    class: 'rounded no-shadow',
    ok: {
      flat: true,
      label: useLang().close,
      class: 'rounded',
      color: 'primary',
    },
  });
}
