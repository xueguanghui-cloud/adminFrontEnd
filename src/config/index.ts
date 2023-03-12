/**
 * 环境配置封装
 */

const env = import.meta.env.MODE || 'prod'

interface IEnvConfig {
  [key: string]: {
    baseApi: string
    timeOut: number
  }
  development: {
    baseApi: string
    timeOut: number
  }
  test: {
    baseApi: string
    timeOut: number
  }
  production: {
    baseApi: string
    timeOut: number
  }
}

const EnvConfig: IEnvConfig = {
  development: {
    baseApi: 'https://www.fastmock.site/mock/275021dd7fb89f79a158f6f95ab62b65/api',
    // baseApi: 'http://localhost:3000/api',
    timeOut: 3000
  },
  test: {
    baseApi: 'https://www.fastmock.site/mock/275021dd7fb89f79a158f6f95ab62b65/api',
    timeOut: 3000
  },
  production: {
    baseApi: 'https://www.fastmock.site/mock/275021dd7fb89f79a158f6f95ab62b65/api',
    timeOut: 3000
  }
}

export default {
  env: 'dev',
  mock: true,
  nameSpace: 'admin-codexgh',
  ...EnvConfig[env]
}
