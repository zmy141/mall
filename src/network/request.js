import axios from 'axios'

export function request(config){
    const instance = axios.create({
        baseURL:'http://123.207.32.32:8000',
        timeout: 5000
    })

    //axios拦截器
    //配置请求拦截
    instance.interceptors.request.use(config=>{
        return config
    },err=>{
        // console.log(err)
    });

    //配置响应拦截
    instance.interceptors.response.use(res=>{
        // console.log(res)
        return res.data
    },err=>{
        // console.log(err)
    })

    return instance(config)
}