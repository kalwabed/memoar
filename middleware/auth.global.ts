export default defineNuxtRouteMiddleware(async (to, from) => {
  const { auth } = useSupabaseAuthClient()
  const { data } = await auth.getUser()
  const isUserAuthenticated = Boolean(data.user)

  // prevent user from accessing the page if not authenticated
  const privateRoutes = ['/new']
  // prevent authenticated user from accessing the page
  const authRoutes = ['/login', '/register']

  if (privateRoutes.includes(to.path) && !isUserAuthenticated) {
    return navigateTo('/')
  } else if (authRoutes.includes(to.path) && isUserAuthenticated) {
    return navigateTo('/')
  } else {
    return true
  }
})
