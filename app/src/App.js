import React, { useState, useEffect } from 'react'
import firebase from './firebase'
import './App.css'

function App() {
  const [user, setUser] = useState({ uid: null, isAnonymous: false })
  console.log(user.uid)
  console.log(user.isAnonymous)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      user && setUser(user)
    })
  }, [])

  return (
    <div className="App">
      <Authentication user={user} setUser={setUser} />
      あなたのユーザーIDは {user.uid || 'まだない'} です。
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
        alert(
          'ログアウトに失敗しました。ログインから時間が経っている場合は、再度ログインしてからログアウトしてください。'
        )
      })
    props.setUser({})
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
