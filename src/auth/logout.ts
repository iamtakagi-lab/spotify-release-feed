import { store } from '..'

export default async (ctx) => {
  store.resetCredential()
  ctx.status = 200
}
