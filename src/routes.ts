import Router from 'koa-router'
import callback from './auth/callback'
import login from './auth/login'
import logout from './auth/logout'
import me from './auth/me'

const router = new Router()
  .get('/auth/me', me)
  .get('/auth/login', login)
  .get('/auth/callback', callback)
  .get('/auth/logout', logout)

export default router
