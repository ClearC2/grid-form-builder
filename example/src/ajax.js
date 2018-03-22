import axios from 'axios'

const AjaxClient = axios.create({baseURL: 'http://localhost:8778'})

AjaxClient.interceptors.request.use(config => config)

AjaxClient.interceptors.response.use(
  resp => resp,
  error => {
    const {data} = error.response
    console.error(`There was a problem with your request.\n ${JSON.stringify(error, null, 5).replace(/"|{|}/g, '')}`)
    return Promise.reject(data) // eslint-disable-line
  }
)

export default AjaxClient
