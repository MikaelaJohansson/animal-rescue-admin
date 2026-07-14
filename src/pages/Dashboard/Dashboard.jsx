import React from 'react'
import {signOut} from "firebase/auth"
import {auth} from "../../firebase"

export default function Dashboard() {

  async function handleSignOut(){

    try{
      await signOut(auth)

    }catch(error){
      console.error(error)
    }

  }

  return (
    <div>

      <h1>Dashboard</h1>
      <button onClick={handleSignOut}>Log out</button>

    </div>
  )
}
