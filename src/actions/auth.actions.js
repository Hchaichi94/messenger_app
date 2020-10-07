import { auth, firestore } from 'firebase'
import { authConstanst } from './constants';

export const signup = (user) => {
    return async (dispatch) => {
        const db = firestore()
        dispatch({ type: `${authConstanst.USER_LOGIN}_REQUEST` });
        auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then(data => {
                const currentUser = auth().currentUser
                const name = `${user.firstName} ${user.lastName}`
                currentUser.updateProfile({
                    displayName: name
                })
                    .then(() => {
                        db.collection('users').add({
                            firstName: user.firstName,
                            lastName: user.lastName,
                            uid: data.user.uid,
                            createdAt: new Date()
                        })
                            .then(() => {
                                const loggedUser = {
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    uid: data.user.uid,
                                    email: user.email
                                }
                                localStorage.setItem('user', JSON.stringify({ loggedUser }))
                                console.log('User logged in successfully...!');
                                dispatch({
                                    type: `${authConstanst.USER_LOGIN}_SUCCESS`,
                                    payload: { user: loggedUser }
                                })
                            })
                            .catch(e => {
                                console.log(e)
                                dispatch({
                                    type: `${authConstanst.USER_LOGIN}_FAILURE`,
                                    payload: { e }
                                });
                            })
                    })
            })
            .catch(e => {
                console.log(e)
            })
    }
}


export const signin = (user) => {
    return async dispatch => {
        dispatch({ type: `${authConstanst.USER_LOGIN}_REQUEST`});
        auth()
            .signInWithEmailAndPassword(user.email, user.password)
            .then((data) => {
                console.log(data)
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: `${authConstanst.USER_LOGIN}_FAILURE`,
                    payload: { error }
                })
            })
    }
}