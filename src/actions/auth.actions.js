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
        dispatch({ type: `${authConstanst.USER_LOGIN}_REQUEST` });
        auth()
            .signInWithEmailAndPassword(user.email, user.password)
            .then((data) => {
                const name = data.user.displayName.split(" ")
                const firstName = name[0]
                const lastName = name[1]

                const loggedUser = {
                    firstName,
                    lastName,
                    uid: data.user.uid,
                    email: data.user.email
                }
                localStorage.setItem('user', JSON.stringify(loggedUser))
                console.log('User logged in successfully...!');
                dispatch({
                    type: `${authConstanst.USER_LOGIN}_SUCCESS`,
                    payload: { user: loggedUser }
                })
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

export const isLoggedInUser = () => {
    return async dispatch => {
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        if (user) {
            dispatch({
                type: `${authConstanst.USER_LOGIN}_SUCCESS`,
                payload: { user }
            });
        } else {
            dispatch({
                type: `${authConstanst.USER_LOGIN}_FAILURE`,
                payload: { error: 'Login again please' }
            });
        }
    }
}

export const logout = (uid) => {
    return async dispatch => {
        dispatch({ type: `${authConstanst.USER_LOGOUT}_REQUEST` });
        //Now lets logout user
        auth()
            .signOut()
            .then(() => {
                //successfully
                localStorage.clear();
                dispatch({ type: `${authConstanst.USER_LOGOUT}_SUCCESS` });
            })
            .catch(error => {
                console.log(error);
                dispatch({ type: `${authConstanst.USER_LOGOUT}_FAILURE`, payload: { error } })
            })
    }
}
