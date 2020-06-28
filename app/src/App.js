import React, { useState, useEffect } from 'react'
import firebase from './firebase'
import './App.css'

function App() {
  const [user, setUser] = useState({ uid: null, isAnonymous: false })
  console.log(user.uid)
  console.log(user.isAnonymous)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user)
      }
    })
  }, [user])

  return (
    <div className="App">
      <Authentication user={user} setUser={setUser} />
      あなたのユーザーIDは {user.uid ? user.uid : 'まだない'} です。
    </div>
  )
}

function Authentication(props) {
  const login = async () => {
    await firebase
      .auth()
      .signInAnonymously()
      .catch(error => {
        console.log(error.code)
        console.log(error.message)
      })
  }

  const logout = async () => {
    if (!firebase.auth().currentUser) {
      return
    }
    await firebase
      .auth()
      .currentUser.delete()
      .catch(error => {
        console.log(error.code)
        console.log(error.message)
      })
    props.setUser({ uid: null, isAnonymous: false })
  }

  return (
    <div>
      {!props.user.uid ? (
        <button onClick={login}>ログイン</button>
      ) : (
        <button onClick={logout}>ログアウト</button>
      )}
    </div>
  )
}

export default App
