import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
} from 'react';

import { Link } from 'react-router-dom';
import { auth, db } from '../firebase';
import Spinner from 'react-bootstrap/Spinner';

import {
    EmailAuthProvider,
    reauthenticateWithCredential,
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    updateEmail,
    updatePassword,
} from 'firebase/auth';
import {
    doc,
    setDoc,
    getDoc,
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
} from 'firebase/firestore';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [refreshState, setRefreshState] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [errorRedirectLink, setErrorRedirectLink] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        setLoading(true);
        const unsubscriber = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        setRefreshState(false);
        return unsubscriber;
    }, [refreshState]);

    const clearError = useCallback(() => {
        setError(null);
        setErrorRedirectLink(null);
        setMessage(null);
    }, []);

    const signup = useCallback(
        (displayName, email, password) => {
            setLoading(true);
            setError(null);
            createUserWithEmailAndPassword(auth, email, password)
                .then((cred) => {
                    setDoc(doc(db, 'users', cred.user.uid), {});
                    updateProfile(cred.user, { displayName });
                })
                .catch((err) => {
                    const regExp = /\(([^()]+)\)/g;
                    const regExpError = err.message.match(regExp);
                    switch (regExpError[0]) {
                        case '(auth/email-already-in-use)':
                            setError(
                                'This email is already in use, if you have this email '
                            );
                            setErrorRedirectLink(
                                <Link to='/login' onClick={clearError}>
                                    Log In
                                </Link>
                            );
                            break;
                        default:
                            setError(null);
                            setErrorRedirectLink(null);
                    }
                    setLoading(false);
                })
                .finally(() => {
                    setRefreshState(true);
                    setLoading(false);
                });
            setRefreshState(true);
        },
        [clearError]
    );

    const login = useCallback(
        (email, password) => {
            setLoading(true);
            setError(null);
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {})
                .catch((err) => {
                    setRefreshState(true);
                    const regExp = /\(([^()]+)\)/g;
                    const regExpError = err.message.match(regExp);
                    switch (regExpError[0]) {
                        case '(auth/user-not-found)':
                            setError(
                                "This email is not Found, if you don't have email press Sign up "
                            );
                            setErrorRedirectLink(
                                <Link to='/signup' onClick={clearError}>
                                    Sign Up
                                </Link>
                            );
                            break;
                        case '(auth/too-many-requests)':
                            setError(
                                'too many try, if You forget password,press '
                            );
                            setErrorRedirectLink(
                                <Link
                                    to='/forgot-password'
                                    onClick={clearError}
                                >
                                    Reset Password?
                                </Link>
                            );
                            break;
                        case '(auth/wrong-password)':
                            setError(
                                'Wrong Password, if you forget password press '
                            );
                            setErrorRedirectLink(
                                <Link
                                    to='/forgot-password'
                                    onClick={clearError}
                                >
                                    Reset Password?
                                </Link>
                            );
                            break;
                        case '(auth/user-disabled)':
                            setError('This Account is disabled ');
                            setErrorRedirectLink(null);
                            break;
                        default:
                            setError(null);
                            setErrorRedirectLink(null);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        },
        [clearError]
    );

    const logout = useCallback(() => {
        setLoading(true);
        setError(null);
        signOut(auth)
            .then(() => {})
            .catch((err) => {
                const regExp = /\(([^()]+)\)/g;
                const regExpError = err.message.match(regExp);
                setError(regExpError[0]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const resetPassword = useCallback(
        (email) => {
            setLoading(true);
            setError(null);
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    setMessage('Check your inbox for further instructions');
                    setErrorRedirectLink(null);
                    setError(null);
                })
                .catch((err) => {
                    const regExp = /\(([^()]+)\)/g;
                    const regExpError = err.message.match(regExp);
                    setMessage(null);
                    switch (regExpError[0]) {
                        case '(auth/user-not-found)':
                            setError(
                                "This email is not Found, if you don't have email press Sign up "
                            );
                            setErrorRedirectLink(
                                <Link to='/signup' onClick={clearError}>
                                    Sign Up
                                </Link>
                            );
                            break;
                        default:
                            setError(null);
                            setErrorRedirectLink(null);
                            setMessage(null);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        },
        [clearError]
    );

    // Profile

    const editProfile = useCallback(
        (displayName, email, password) => {
            setLoading(true);
            setError(null);
            const credential = EmailAuthProvider.credential(
                currentUser.email,
                password
            );
            reauthenticateWithCredential(currentUser, credential)
                .then(() => {
                    if (displayName !== currentUser.displayName)
                        updateProfile(currentUser, { displayName })
                            .then(() => {
                                console.log('Profile updated successfully');
                            })
                            .catch((err) => console.error(err));
                    if (email !== currentUser.email)
                        updateEmail(currentUser, email)
                            .then(() => {
                                console.log('Email updated successfully');
                            })
                            .catch((err) => console.error(err));
                    setMessage('Update Profile success');
                })
                .catch((err) => {
                    const regExp = /\(([^()]+)\)/g;
                    const regExpError = err.message.match(regExp);
                    setMessage(null);
                    switch (regExpError[0]) {
                        case '(auth/wrong-password)':
                            setError(
                                'Wrong Password, if you forget password press '
                            );
                            setErrorRedirectLink(
                                <Link
                                    to='/profile/reset-password'
                                    onClick={clearError}
                                >
                                    Reset Password?
                                </Link>
                            );
                            break;
                        case '(auth/missing-password)':
                            setError('Please Enter Password');
                            setErrorRedirectLink(null);
                            break;
                        default:
                            setError(regExpError[0]);
                            setErrorRedirectLink(null);
                            setMessage(null);
                    }
                })
                .finally(() => {
                    setTimeout(() => {
                        setRefreshState(true);
                        setLoading(false);
                    }, 1000);
                });
        },
        [clearError, currentUser]
    );

    // Change Password

    const editPassword = useCallback(
        (oldPassword, newPassword) => {
            setLoading(true);
            setError('');
            const credential = EmailAuthProvider.credential(
                currentUser.email,
                oldPassword
            );
            reauthenticateWithCredential(currentUser, credential)
                .then(() => {
                    updatePassword(currentUser, newPassword)
                        .then(() => {
                            setMessage('Update Password success');
                        })
                        .catch((err) => {
                            setError(err.message);
                        })
                        .finally(() => {
                            setLoading(false);
                        });
                })
                .catch((err) => {
                    const regExp = /\(([^()]+)\)/g;
                    const regExpError = err.message.match(regExp);
                    setMessage(null);
                    switch (regExpError[0]) {
                        case '(auth/wrong-password)':
                            setError(
                                'Wrong Password, if you forget password press '
                            );
                            setErrorRedirectLink(
                                <Link
                                    to='/profile/reset-password'
                                    onClick={clearError}
                                >
                                    Reset Password?
                                </Link>
                            );
                            break;
                        case '(auth/missing-password)':
                            setError('Please Enter Password');
                            setErrorRedirectLink(null);
                            break;
                        default:
                            setError(regExpError[0]);
                            setErrorRedirectLink(null);
                            setMessage(null);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        },
        [clearError, currentUser]
    );

    // Tasks

    // Add TaskdisplayNamese
    const addTask = useCallback(
        (task) => {
            setLoading(true);
            setError(null);
            const colRef = collection(db, 'users', currentUser.uid, 'tasks');
            addDoc(colRef, {
                ...task,
                completed: false,
            })
                .then(() => {})
                .catch((err) => {
                    setError(err.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        },
        [currentUser]
    );

    const compleatedTask = useCallback(
        (id, completed) => {
            setLoading(true);
            setError(null);
            const docRef = doc(db, 'users', currentUser.uid, 'tasks', id);
            updateDoc(docRef, { completed: !completed })
                .then(() => {})
                .catch((err) => {
                    setError(err.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        },
        [currentUser]
    );

    // getData Task
    const getDataTask = useCallback(
        (id) => {
            return getDoc(doc(db, 'users', currentUser.uid, 'tasks', id)).catch(
                (error) => {
                    console.error('Error getting task: ', error);
                }
            );
        },
        [currentUser]
    );

    // update Task
    const updateTask = useCallback(
        (id, task) => {
            setLoading(true);
            setError('');
            const docRef = doc(db, 'users', currentUser.uid, 'tasks', id);
            updateDoc(docRef, task)
                .then(() => {})
                .catch((err) => {
                    setError(err.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        },
        [currentUser]
    );

    const deleteTask = useCallback(
        (id) => {
            setLoading(true);
            setError('');
            deleteDoc(doc(db, 'users', currentUser.uid, 'tasks', id))
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                })
                .finally(() => {
                    setLoading(false);
                });
        },
        [currentUser]
    );

    const values = {
        loading,
        setLoading,
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        editProfile,
        editPassword,
        addTask,
        compleatedTask,
        updateTask,
        deleteTask,
        getDataTask,
        error,
        setError,
        clearError,
        errorRedirectLink,
        setErrorRedirectLink,
        message,
        setMessage,
    };

    return loading ? (
        <Spinner
            className='styleSpinner'
            animation='border'
            variant='primary'
        />
    ) : (
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    );
}
