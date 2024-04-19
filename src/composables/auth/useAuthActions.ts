import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'

export function useAuthActions() {
  const provider = new GoogleAuthProvider()
  const auth = useFirebaseAuth()!
  const router = useRouter()
  const toast = useToast()

  const loading = ref(false)

  async function loginWithGoogle() {
    try {
      loading.value = true

      const { user } = await signInWithPopup(auth, provider)

      if (!user.uid) {
        throw new Error('User cannot be loaded')
      }

      router.push({ name: 'auth-redirect' })
    } catch (error) {
      toast.add({
        severity: 'error',
        detail: 'Falha no login. Recarregue e tente novamente',
        life: 2000
      })
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    try {
      loading.value = true

      await signOut(auth)

      toast.add({
        severity: 'info',
        detail: 'Deslogado com sucesso! Até breve',
        life: 2000
      })

      router.push({ name: 'auth-login' })
    } catch (error) {
      toast.add({
        severity: 'error',
        detail: 'Falha no logout. Recarregue e tente novamente',
        life: 2000
      })
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    loginWithGoogle,
    logout
  }
}
