import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthFunctions.js"
import { Link, useHistory } from "react-router-dom"

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const handleKeypress = e => {
    //it triggers by pressing the enter key
  if (e.keyCode === 13) {
    e.preventDefault();
    handleSubmit();
  }};

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/todo")
    }
    catch(e) {
      if(e.message==="There is no user record corresponding to this identifier. The user may have been deleted.")
      {
        setError("Failed to log in: User not exist !! ")
      }
      else if(e.message==="The password is invalid or the user does not have a password."){
        setError("Failed to log in: The password is invalid");
      }
      else{
           setError("Failed to log in")   
      }
      // setError("Failed to log in")
    }
    setLoading(false)
  }

  return (
    <div >
      {/* style={{width:"80vw",paddingLeft:"28vw",paddingRight:"10vw",paddingTop:"10vw",paddingBottom:"4vw",mixBlendMode:"screen"}} */}
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          <hr style={{backgroundColor:"white"}}></hr>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit} onKeyPress={handleKeypress}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  )
}
