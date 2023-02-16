import axios, { AxiosInstance, AxiosRequestConfig, AxiosError,AxiosResponse } from "axios";
import { store } from "@/redux";
import { message } from "antd";
import { checkStatus } from "./checkStatus";

class AxiosUtil {
  private http: AxiosInstance;

  constructor () {
    this.http = axios.create({
      baseURL: '/api',
      timeout: 3000,
      // 跨域时候允许携带凭证
	    withCredentials: true
    })

    // 拦截器在实例一创建的时候就要调用
    this.addInterceptors();
  }

  // axios 拦截器
  private addInterceptors() {
    // 请求拦截
    this.http.interceptors.request.use(
      (config: any) => {
        // 可以做一些操作 比如拦截添加token
        const token:string = store.getState().global?.token;
        return { ...config, headers: { ...config.headers, "x-access-token": token } };
      },
      (err) => {return Promise.reject(err)}
    )

    // 响应拦截
    this.http.interceptors.response.use(
      (res: AxiosResponse) => {
        
        try {
          const { data, config } = res;
          // 处理请求回来的东西

          // 登录失效 599
          if(data.code == 599){
            message.error(data.msg);
            window.location.hash = '/login';
            return data;
          }
          // 全局错误信息拦截
          if(data.code && data.code !== 200){
            message.error(data.msg);
            return data;
          }
          // 请求成功
          return data;
        } catch (error) {
          console.log(error, 6666);
          
        }
        
      },
      (err:AxiosError) => {
        const { response } = err;
        // 请求超时单独判断，请求超时没有 response
				if (err.message.indexOf("timeout") !== -1) message.error("请求超时，请稍后再试");
				// 根据响应的错误状态码，做不同的处理
				if (response) checkStatus(response.status);
				// 服务器结果都没有返回(可能服务器错误可能客户端断网) 断网处理:可以跳转到断网页面
				if (!window.navigator.onLine) window.location.hash = "/500";
				return Promise.reject(err);
      }
    )
  }


  // 配置必传参数的方法
  private request(method: string, url: string, data?:any){
    return this.http({
      method, 
      url,
      data: method === "post" ? data : '',
      params: method === "get" ? data : ''
    })
  }

  // 进一步配置几种请求方式
  public post(url:string, data?:any){
    return this.request("post", url, data)
  }

  public get(url:string, data?:any){
    return this.request("get", url, data)
  }

}

const http = new AxiosUtil();
export default http;