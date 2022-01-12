import React from "react"
import Signup from "./Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthFunctions"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import Home from "./todo"
import Front from "./Home.js"

function App() {
  return (
    // <Container
    //   className="d-flex align-items-center justify-content-center"
    //   style={{ minHeight: "100vh" }}
    // >
      // {/* <div className="w-100" style={{ maxWidth: "400px" }}> */}
      <div className="App">
        <Router>
          <AuthProvider>
            <Switch>
              {/* <PrivateRoute exact path="/" component={Dashboard} /> */}
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/" component={Front} />
              <Route exact path="/login" component={Login} />
              <Route  path="/forgot-password" component={ForgotPassword} />
              <PrivateRoute exact path="/todo" component={Home} />
              {/* <Route exact path="/front" component={Front}/> */}
            </Switch>
          </AuthProvider>
        </Router>
       </div> 
    // {/* </Container> */}
  );
}

export default App
