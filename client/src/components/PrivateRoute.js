import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../contexts/AuthFunctions"

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      render={props => {
        // if(!currentUser.emailVerified){
        //   return <Redirect to="/verify" 
        // }
        return (currentUser && currentUser.emailVerified ) ? <Component {...props} /> : <Redirect to="/login" />
      }}
    ></Route>
  )
}
