import {
  fetch, get, post, put, del, uploadFile, interceptor,
  requestUrlPrefix,
  responseIntCode,
  responseSuccessSign,
  // responseRedirect,
  // responseFormatter,
  // responseMessage,
  // responseHangUp,
  errorHandler, config,
} from '@ali-whale/fetch-web';

config({

  /* 异常响应模式：忽略 当响应异常时，不向后抛出异常，返回一个Object: { error: true, status: 500 } (status 是本次请求的状态码) */
  errorHandler: errorHandler.ignore,
});

// 请求拦截器 - 为所有请求添加前缀 "/api"
interceptor.request.use(requestUrlPrefix('/api'));

/* 将string类型的errCode转换为number */
interceptor.response.use(responseIntCode());

/* 当相应成功时，为结果添加标记 success: true */
interceptor.response.use(responseSuccessSign({ code: 0 }));

/* 当返回结果存在 redirect_url 时，跳转到该字段所标记的页面 */
// interceptor.response.use(responseRedirect({ redirectFieldName: "redirect_url" }));

/* 请求结果不是这样的解构： { errCode, errMsg, data } ，你可以标记该这三个字段的实际字段名，以做格式化处理 */
// interceptor.response.use(responseFormatter({
//   codeField: "code",
//   msgField: "message",
//   dataField: "datas",
// }));

/* 自定义拦截器：当errCode = -1 时，自定义处理逻辑 / */
// interceptor.response.use(({ result }) => {
//   if (result.errCode === -1) {
//     /* import { router } from "umi" */
//     router.push("/");
//   }
// });

/* 当errCode = -2 时，弹出提示信息 */
// interceptor.response.use(responseMessage({
//   code: -2,
//   msgType: "info",
//   msgFormatter: msg => `接到服务端消息：${msg}`,
//   duration: 1,
// }));

/* 当errCode = -3 时，该请求永远不会完成 */
// interceptor.response.use(responseHangUp({ code: -3 }));


// 导出你所需要使用的方法
export { fetch, get, post, put, del, uploadFile };
