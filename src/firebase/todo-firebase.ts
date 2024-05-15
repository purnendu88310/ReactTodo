import {db} from './firebase'
import {collection, addDoc, Timestamp, onSnapshot, query, orderBy} from 'firebase/firestore'

export const handleSubmit = async (data:any) => {
    try {
      await addDoc(collection(db, 'tasks'),data)
    } catch (err) {
      alert(err)
    }
  }
  export const getAllTodo = async (data:any) => {
    try {
        const q = query(collection(db, 'tasks'), orderBy('created', 'desc'))
    onSnapshot(q, (querySnapshot) => {
        debugger
      querySnapshot.docs.map(doc => ({

        id: doc.id,
        data: doc.data()
      }))
    })
    } catch (err) {
      alert(err)
    }
  }
