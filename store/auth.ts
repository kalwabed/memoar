import { User } from '~/types/entities'

export const useAuthStore = createGlobalState(() => {
  const _user = ref<User>(null)

  const user = computed({
    get: () => _user.value,
    set: (value: User) => {
      _user.value = value
    },
  })

  return {
    user,
  }
})
