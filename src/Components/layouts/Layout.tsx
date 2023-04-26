import React, { FormEvent, useRef } from 'react'
import Header from './Header'
import axios from 'axios'
import './Layout.css'
import { Container, Form, Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { productFilteredListActions } from '../../store/Store'
import { useNavigate } from 'react-router-dom'


const Layout = (props: any) => {

    const inputRef = useRef<HTMLInputElement>(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const submitHandler = async (e: FormEvent) => {

        const searchValue = inputRef.current?.value
        e.preventDefault()
        inputRef.current!.value = ''
        await axios.post(`/products/${searchValue}`)
            .then((response) => {
                if (response.status !== 200) {
                    toast.error("Something went wrong!")
                }

                console.log(" Search Response ", response)
                toast.success("Search Completed!")
                dispatch(productFilteredListActions.storeFilteredProducts(response.data))
                navigate(`/products/find/${searchValue}`, { replace: true })



            })

            .catch((error) => {

                toast.error(error)
            })

    }

    return (
        <div>
            <Header />
            <main className="main-container">

                <Container>
                    {props.children}
                </Container>
            </main>

        </div>
    )
}
export default Layout