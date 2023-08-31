import { Notify } from 'quasar';

export function useNotify(message: string) {
  return Notify.create({
    message: message,
    classes: 'bg-page rounded bordered no-shadow smm-color__text-black',
    html: true,
    position: 'top',
    timeout: 1200,

  });
}
