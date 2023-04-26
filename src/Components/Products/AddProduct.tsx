import React, { Fragment, useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import '../Auth/Auth.css'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { RootState, addProductActions } from '../../store/Store'
import { useDispatch, useSelector } from 'react-redux'
import { useSessionStorageBoolean } from "react-use-window-sessionstorage";


const AddProduct: React.FC<{}> = (props) => {


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const productName: any = useSelector<RootState>((item) => item.addProductState.name)
    const productDesc: any = useSelector<RootState>((item) => item.addProductState.desc)
    const productImg: any = useSelector<RootState>((item) => item.addProductState.img)
    const productQuantity: any = useSelector<RootState>((item) => item.addProductState.quantity)
    const productPrice: any = useSelector<RootState>((item) => item.addProductState.price)





    const nameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const pName: string = event.target.value
        dispatch(addProductActions.addProductName(pName))

    }

    const descChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const pDesc = event.target.value
        dispatch(addProductActions.addDescription(pDesc))

    }

    const imgChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const pImg = event.target.value
        dispatch(addProductActions.addImageUrl(pImg))

    }

    const priceChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const pPrice = event.target.value
        dispatch(addProductActions.addPrice(pPrice))

    }

    const quantityChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const pQuantity = event.target.value
        dispatch(addProductActions.addQuantity(pQuantity))

    }




    async function addProducts(productName: string, productDesc: string, productImg: string, productQuantity: number, productPrice: string) {

        console.log(productName, productDesc, productImg, productPrice, productQuantity)


        await axios.post('/products', { name: productName, desc: productDesc, img: productImg, quantity: productQuantity, price: productPrice })
            .then((response) => {
                if (response.status !== 200) {
                    toast.error("Something went wrong!")
                }

                console.log(" Products Response ", response)
                toast.success("Product Added!")
                navigate('/products', { replace: true })

            })

            .catch((error) => {

                toast.error(error)
            })


    }

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault()
        console.log("Submit")
        addProducts(productName, productDesc, productImg, productQuantity, productPrice)


    }



    return (
        <Fragment>


            <div className='add-app-form'>
                <h1 className='app-heading'>Add Product</h1>

                <div className='form-grp'>
                    <Form onSubmit={submitHandler} >

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control required={true} onChange={nameChangeHandler} type="text" placeholder="Name of Product" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Image Url</Form.Label>
                            <Form.Control required={true} onChange={imgChangeHandler} type="text" placeholder="Image URL for Product" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Price</Form.Label>
                            <Form.Control required={true} onChange={priceChangeHandler} type="text" placeholder="Add Price" />
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control required={true} onChange={quantityChangeHandler} type="number" placeholder=" Add Quantity " />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control required={true} onChange={descChangeHandler} as="textarea" rows={3} />
                        </Form.Group>

                        <Button variant="success" className='addapp-btn' type="submit">
                            Add
                        </Button>
                        <Link to="/products"> <Button variant="secondary" className='addapp-btn' type="submit">
                            Cancel
                        </Button>
                        </Link>
                    </Form>

                </div>




            </div>
        </Fragment>
    )
}

export default AddProduct