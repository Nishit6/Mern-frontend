import React, { Fragment, useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import './Auth.css'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { authActions } from '../../store/Store'
import { useDispatch } from 'react-redux'



const Login: React.FC<{ loginUserResponse: (loggedInUserDetails: any) => void }> = (props) => {





    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        dispatch(authActions.isLoggedIn(false))
    }, [])



    // Input Handlers


    const inputEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const emailValue = event.target.value
        setEmail(emailValue)


    }

    const inputPasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const passwordValue = event.target.value
        setPassword(passwordValue)


    }






    async function loginUser(email: string, password: string) {

        await axios.post('/login', { email: email, password: password })
            .then((response) => {
                if (response.status !== 200) {
                    toast.error("Something went wrong!")
                }
                if (response.data === "Wrong password") {
                    toast.error("Wrong Password!")
                    return
                }
                if (response.data.message === "Wrong email or password") {
                    toast.error(response.data.message)
                    return
                }

                console.log(" Login User Response ", response)

                if (!response.data.auth) {
                    dispatch(authActions.isLoggedIn(false))
                    toast.error("You are not authorized!")
                } else {

                    dispatch(authActions.isLoggedIn(true))
                    localStorage.setItem("username", response.data.result.username)
                    localStorage.setItem("token", response.data.token)
                    props.loginUserResponse(response.data)
                    toast.success("Logged In successfully!")
                    navigate('/', { replace: true })
                }



            })

            .catch((error) => {

                toast.error(error)
            })


    }


    // form submit Handler

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault()



        if (email.length === 0 || password.length === 0) {
            return
        } else if (password.length < 6) {
            toast.error("Password too short!")
            return
        } else {
            loginUser(email, password)
        }

    }

    return (
        <Fragment>


            <div className='add-app-form'>
                <h1 className='app-heading'>Log In</h1>
                <Form onSubmit={submitHandler}>
                    <div className='form-grp'>

                        <Form>



                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control required={true} onChange={inputEmailHandler} type="email" placeholder="Enter email" />

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control required={true} onChange={inputPasswordHandler} type="password" placeholder="Password" />
                            </Form.Group>


                        </Form>
                    </div>
                    <Button variant="success" className='addapp-btn' type="submit">
                        Login
                    </Button>
                    <Link to="/register"><p>Not registered?</p></Link>

                </Form>
            </div>
        </Fragment>
    )
}

export default Login