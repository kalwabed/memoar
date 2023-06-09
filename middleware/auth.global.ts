export default defineNuxtRouteMiddleware(to => {
  if (process.server) {
    const user = useSupabaseUser()

    const authPages = ['/login', '/signup']

    if (!user.value && !authPages.includes(to.path)) {
      return '/login'
    } else if (user.value && authPages.includes(to.path)) {
      return '/'
    }
  }
})
