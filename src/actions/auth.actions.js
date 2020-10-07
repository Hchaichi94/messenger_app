import { auth, firestore } from 'firebase'

export const signup = (user) => {
    return async (dispatch) => {
        console.log('hellllllllllllllllllo')
        const db = firestore()
        auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then(user => {
                console.log(user)
            })
            .catch(e => {
                console.log(e)
            })
    }
} 