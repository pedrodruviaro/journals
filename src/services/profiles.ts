import type { UserProfile } from '@/types'
import type { User } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import type { Firestore } from 'firebase/firestore'

export default (database: Firestore) => ({
  async create(user: User) {
    const newUserProfile: UserProfile = {
      photoURL: user.photoURL,
      email: user.email,
      name: user.displayName ?? '',
      bio: '',
      site: ''
    }

    await setDoc(doc(database, 'profiles', user.uid), newUserProfile)
  },

  async getProfile(userId: string): Promise<UserProfile> {
    const profileDocRef = doc(database, 'profiles', userId)
    const profileDocSnap = await getDoc(profileDocRef)

    if (!profileDocSnap.exists()) throw new Error('Profile does not exists')

    return profileDocSnap.data() as UserProfile
  },

  async checkIfUserExists(userId: string) {
    const profileDocRef = doc(database, 'profiles', userId)
    const profileDocSnap = await getDoc(profileDocRef)

    return profileDocSnap.exists()
  }
})
