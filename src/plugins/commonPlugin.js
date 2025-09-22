import common from '../common/common';

export default {
  install: (app) => {
    app.config.globalProperties.$common = common;
  }
}