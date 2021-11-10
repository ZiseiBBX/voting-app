import create from "zustand"
import { devtools } from 'zustand/middleware'
import { auth, firestore } from "../services/firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { ILogin, IRegister, IUserData } from "../utils/interfaces"

interface IUserStore {
  user: IUserData
  register(data: IRegister): Promise<boolean>
  login(data: ILogin): Promise<boolean>
  fetchUserData(uid: string): Promise<void>
  logout(): void
}

const initialUserData: IUserData = {
  name: "",
    email: "",
    uid: ""
}

const useUserStore = create<IUserStore>(devtools((set, get) => ({
  user: initialUserData,
  register: async (data) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, data.email, data.password)
      const docRef = doc(firestore, "users", res.user.uid)
      const finalData: IUserData = {
        name: data.name,
        email: data.email,
        uid: res.user.uid
      }
      await setDoc(docRef, finalData)
      set({ user: finalData })
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  },
  login: async (data) => {
    try {
      const res = await signInWithEmailAndPassword(auth, data.email, data.password)
      const docRef = doc(firestore, "users", res.user.uid)
      const snap = await getDoc(docRef)
      if (snap.exists()) {
        set({ user: snap.data() as IUserData })
      }
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  },
  fetchUserData: async (uid) => {
    try {
      const docRef = doc(firestore, "users", uid)
      const snap = await getDoc(docRef)
      set({ user: snap.data() as IUserData })
    } catch (err) {
      console.log(err)
    }
  },
  logout: () => {
    signOut(auth)
    set({ user: initialUserData })
  }
})))

export { useUserStore }