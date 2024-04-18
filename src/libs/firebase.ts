import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_SUPABASE_API_KEY,
  authDomain: import.meta.env.VITE_SUPABASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_SUPABASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_SUPABASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_SUPABASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_SUPABASE_APP_ID
}

export const firebaseApp = initializeApp(firebaseConfig)
