export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log('🚀 ~ file: auth.global.ts:2 ~ defineNuxtRouteMiddleware ~ from:', from)
  const authClient = useSupabaseAuthClient()
  const isUserExisted = (await authClient.auth.getUser()).data.user?.id
  const authPages = ['/login', '/signup']

  if (authPages.includes(to.path) && isUserExisted) {
    return navigateTo('/')
  }

  if (!authPages.includes(to.path) && !isUserExisted) {
    const backPage = '/login'
    return navigateTo(backPage)
  }
})
