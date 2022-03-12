// export const BACK_URL = 'http://localhost:3001'
// export const BACK_URL = 'http://3.38.181.206' //실서버
export const BACK_URL = process.env.NODE_ENV === 'production' ? 'http://api.tweeter.ga' : 'http://localhost:80';