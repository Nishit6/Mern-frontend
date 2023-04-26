import React, { Fragment, useEffect, useState, useRef } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import '../Auth/Auth.css'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { RootState } from '../../store/Store'
import { useDispatch, useSelector } from 'react-redux'
import { useSessionStorageBoolean } from "react-use-window-sessionstorage";


const EditProduct: React.FC<{ productId: string }> = (props) => {

    const products: any = useSelector<RootState>((item) => item.productList.productList)
    const filteredProduct = products.filter((item: any) => { return item._id === props.productId })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const nameRef = useRef<HTMLInputElement>(null)
    const descRef = useRef<HTMLTextAreaElement>(null)
    const imgRef = useRef<HTMLInputElement>(null)
    const priceRef = useRef<HTMLInputElement>(null)
    const quantityRef = useRef<HTMLInputElement>(null)


    async function editProduct(productName: string, productDesc: string, productImg: string, productQuantity: number, productPrice: string, id: string) {




        await axios.patch(`/products/${id}`, { name: productName, desc: productDesc, img: productImg, quantity: productQuantity, price: productPrice })
            .then((response) => {
                if (response.status !== 200) {
                    toast.error("Something went wrong!")
                }

                console.log(" Product Update Response ", response)
                toast.success("Product Updated Successfully!")
                navigate('/products', { replace: true })

            })

            .catch((error) => {

                toast.error(error)
            })


    }


    const editHandler = (id: string) => {


        const productName = nameRef.current!.value
        const productDesc = descRef.current!.value
        const productImg = imgRef.current!.value
        const productPrice = priceRef.current!.value
        const productQuantity = Number(quantityRef.current!.value)

        // console.log(productName, productDesc, productImg, productPrice, productQuantity)
        editProduct(productName, productDesc, productImg, productQuantity, productPrice, id)

    }




    return (
        <Fragment>


            <div className='add-app-form'>
                <h1 className='app-heading'>Edit Product</h1>
                {filteredProduct.map((item: any) => (


                    <div className='form-grp'>

                        <Form>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control ref={nameRef} defaultValue={item.name} required={true} type="text" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Image Url</Form.Label>
                                <Form.Control ref={imgRef} defaultValue={item.img} required={true} type="text" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Price</Form.Label>
                                <Form.Control ref={priceRef} defaultValue={item.price} required={true} type="text" />
                            </Form.Group>


                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control ref={quantityRef} defaultValue={item.quantity} required={true} type="number" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Description</Form.Label>
                                <Form.Control ref={descRef} defaultValue={item.desc} required={true} as="textarea" rows={3} />
                            </Form.Group>

                            <Button variant="success" onClick={() => editHandler(item._id)} className='addapp-btn' type="button">
                                Edit
                            </Button>
                            <Link to="/products">
                                <Button variant="secondary" className='addapp-btn' type="button">
                                    Cancel
                                </Button></Link>


                        </Form>
                    </div>
                ))}



            </div>
        </Fragment>
    )
}

export default EditProduct