import { User } from '~/types/entities'

export const useAuthStore = createGlobalState(() => {
  const _user = ref<Partial<User>>(null)

  const user = computed({
    get: () => _user.value,
    set: (value: Partial<User>) => {
      _user.value = value
    },
  })

  return {
    user,
  }
})
