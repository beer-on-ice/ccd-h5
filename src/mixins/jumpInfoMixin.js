export default {
  methods: {
    gengerateJumpInfo() {
      let u = navigator.userAgent;
      let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      let params = [...arguments].map(item => {
        return String(item);
      });
      if (isiOS) {
        try {
          window.webkit.messageHandlers.invite.postMessage(params);
        } catch (error) {
          console.log("OC");
        }
      } else if (isAndroid) {
        try {
          // eslint-disable-next-line no-undef
          test.hello(params);
        } catch (error) {
          console.log("OC");
        }
      }
    },
    generateShare() {
      const {
        $route: {
          path,
          query: { type }
        }
      } = this;
      const oScript = document.createElement("script");
      const oScriptParam = document.createElement("script");
      oScript.type = "text/javascript";
      oScriptParam.type = "text/javascript";
      oScript.src = "//b5z6.t4m.cn/sharesdk.js";
      oScriptParam.innerHTML = `
      ShareSDK([
        {
          params: {
            //params字段是网页回环跳转到App时带给App的参数
            // targetAction_iOS和targetAction_And:这两个字段时必须字段，对应iOS的一个Controller的名字和安卓的一个Activity的名字，请让iOS和安卓的小伙伴提供
            targetAction_iOS: 'WebViewController',
            targetAction_And: 'XiangmupinpaiActivity',
            //以下时可选字段，这些字段会原封不动的带给客户端App
            //other: 'other params',
            url: "${path}?type=${type}&share=0", // 分享链接
            // title: '', // 分享标题
            // description: '' // 分享内容
          }
        }
      ])
      `;
      document.body.appendChild(oScript);
      setTimeout(() => {
        document.body.appendChild(oScriptParam);
      }, 2000);
    }
  }
};
