import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyCl0LXE4M3Ntb-viwD734CApta9MjAkGCw',
  authDomain: 'crwn-db-837b3.firebaseapp.com',
  projectId: 'crwn-db-837b3',
  storageBucket: 'crwn-db-837b3.appspot.com',
  messagingSenderId: '295051865175',
  appId: '1:295051865175:web:0d7378fb0033f2954ac712',
  measurementId: 'G-KJV8DSEHQH',
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef

  // console.log(firestore.doc('users/128fdashadu'))
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
