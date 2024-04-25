import { ref } from 'vue'
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  getDoc,
  addDoc
} from 'firebase/firestore'
import type { Journal } from '@/types'
import type { Firestore } from 'firebase/firestore'
import type { Ref } from 'vue'

export interface UpdateJournalOptions {
  journal: Ref<Journal>
}

export interface ReadOneOptions {
  journalId: string
  userId: string
}

export interface CreateOptions {
  journal: Ref<Journal>
  userId: string
}

export default (database: Firestore) => ({
  async readOne({ journalId, userId }: ReadOneOptions): Promise<Journal | undefined> {
    const docRef = doc(database, 'journals', journalId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const doc = docSnap.data() as Journal
      if (doc.userId !== userId) {
        return undefined
      }
      return doc
    }
  },

  async readAll(userId: string) {
    const response = ref<Journal[]>([])

    const q = query(collection(database, 'journals'), where('userId', '==', userId))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      const journal = doc.data() as Journal

      journal.id = doc.id
      response.value.push(journal)
    })

    return response
  },

  async readAllPublic(userId: string) {
    const response: Journal[] = []

    const q = query(
      collection(database, 'journals'),
      where('userId', '==', userId),
      where('isPublic', '==', true)
    )
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      const journal = doc.data() as Journal

      journal.id = doc.id
      response.push(journal)
    })

    return response
  },

  async update({ journal }: UpdateJournalOptions) {
    const { id, ...journalData } = journal.value

    if (!id) {
      throw new Error('ID do jornal não fornecido')
    }

    const docRef = doc(database, 'journals', id)
    await updateDoc(docRef, { ...journalData, updatedAt: new Date().toISOString() })

    return { id }
  },

  async create({ journal, userId }: CreateOptions) {
    const response = await addDoc(collection(database, 'journals'), {
      ...journal.value,
      userId: userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })

    return response
  }
})
