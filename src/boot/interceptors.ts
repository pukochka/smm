import axios from 'axios';
import config from 'src/config';
import { useDialog } from 'src/utils/use/useDialog';

const smm = axios.create({
  baseURL: config.domain,
  method: 'get',
});

const bott = axios.create({
  baseURL: config.domain_bott,
  method: 'post',
});

for (const instance of [smm, bott]) {
  instance.interceptors.request.use(function (config) {
    return config;
  });

  instance.interceptors.response.use(
    function (response) {
      if (response.data.result === true) {
        return response;
      } else {
        useDialog(response.data.message);

        return Promise.reject('error');
      }
    },
    function (error) {
      useDialog('Server Error');

      return Promise.reject(error);
    }
  );
}

export { bott, smm };
