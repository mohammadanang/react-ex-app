import axios from "axios"
import Cookies from "js-cookie"
import { defaultPaging } from "../constants"
import { apiUrl } from "../constants"
const API_URL = apiUrl

class Api {
    _request = (
        method,
        url,
        payload,
        config = {}
    ) => {
        const instance = axios.create({
            baseURL: API_URL
        })

        instance.interceptors.response.use(
            function(response) {
                return response.data
            },

            function(error) {
                if(process.env.NODE_ENV === "development") {
                    console.log(error.response)
                }

                return Promise.reject(error.response || { message: error.message })
            }
        )

        const headers = {
            ...config.headers,
            "Authorization": Cookies.get("access_token")
        }

        return instance({
            method,
            url,
            data: method !== "get" ? payload : null,
            params: method === "get" ? payload : null,
            ...config,
            headers
        })
    }

    post(url, payload, config) {
        return this._request("post", url, payload, config)
    }

    get(url, payload, config) {
        return this._request("get", url, payload, config)
    }

    put(url, payload, config) {
        return this._request("put", url, payload, config)
    }

    delete(url, payload, config) {
        return this._request("delete", url, payload, config)
    }

    setupDefaultMethods(path) {
        return {
            get: (payload) => {
                const params = {
                    ...defaultPaging,
                    ...payload
                }

                if(payload && payload.id) {
                    delete params.id

                    return this.get(`/${path}/${payload.id}`, params)
                }

                return this.get(`/${path}`, params)
            },
            create: (payload) => {
                return this.post(`/${path}`, payload)
            },
            update: (payload) => {
                const params = { ...payload }
                delete params.id

                return this.put(`/${path}/${payload.id}`, payload)
            },
            delete: (id) => {
                return this.delete(`/${path}/${id}`)
            }
        }
    }
}

export default new Api()
