const variables = {
  loginPageCount: 1,
};

export default {
  install(Vue) {
    Vue.config.globalProperties.$lpc = variables.loginPageCount;
  },
};
