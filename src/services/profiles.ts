import { useServices } from '@/composables/services/useServices'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import type { UserAditionalInfos, UserProfile } from '@/types'
import type { User } from 'firebase/auth'
import type { Firestore } from 'firebase/firestore'

export interface UpdateProfileOptions {
  userId: string
  userInfos: UserAditionalInfos
}

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
  },

  async updateProfile({ userId, userInfos }: UpdateProfileOptions) {
    const profileDocRef = doc(database, 'profiles', userId)

    const response = await updateDoc(profileDocRef, {
      site: userInfos.site ?? '',
      bio: userInfos.bio ?? '',
      name: userInfos.name
    })

    return response
  },

  async getPublicProfile(userId: string) {
    const services = useServices()

    const profile = this.getProfile(userId)
    const journals = services.journals.readAllPublic(userId)

    const response = await Promise.all([profile, journals])

    return {
      profile: response[0],
      journals: response[1]
    }
  }
})
