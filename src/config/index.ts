import dev from './app.dev'
import prod from './app.prod'

const env = process.env.NODE_ENV

console.log(env)

export default env === 'production' ? prod : dev