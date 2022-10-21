import HttpRequest from 'src/utils/request';

const Wxcore = new HttpRequest('https://www.showpay.top/wxcore').request;

export const addWhiteMetaId = (metaId: string) => {
  return Wxcore.post('/white/gray/set', {
    action_index: 0,
    pass: 'makeMarketByLgs',
    whitelist: [metaId],
  });
};
