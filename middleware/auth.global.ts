export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useSupabaseUser()
  const isUserAuthenticated = Boolean(user.value)

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
