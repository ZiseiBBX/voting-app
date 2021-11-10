import { auth, firestore } from "./firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"

interface IUserData {
  name: string
  email: string
  password: string
}

const DatabaseService = {
  register: async (data: IUserData) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, data.email, data.password)
      const docRef = doc(firestore, "users", res.user.uid)
      await setDoc(docRef, data)
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }
}

export default DatabaseService