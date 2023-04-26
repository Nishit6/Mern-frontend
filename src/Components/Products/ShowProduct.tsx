import React, { Fragment, useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { Row, Card, Col } from 'react-bootstrap'
import { toast } from 'react-toastify'
import Product from '../../models/product'
import { RootState } from '../../store/Store'
import './ShowProduct.css'




const ShowProduct: React.FC<{ productId: string }> = (props) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const products: any = useSelector<RootState>((item) => item.productList.productList)
    const filteredProduct = products.filter((item: any) => { return item._id === props.productId })
    const isLoggedIn = useSelector<RootState>((item) => item.auth.isLoggedIn)





    const deleteHandler = async (pId: string) => {

        if (!isLoggedIn) {
            toast.error("Please login first!")
            navigate('/login', { replace: true })
            return
        }

        await axios.delete(`/products/${pId}`)
            .then((response) => {
                if (response.status !== 200) {
                    toast.error("Something went wrong!")
                }

                console.log(" Product Delete Response ", response)
                toast.success("Product Deleted!")
                navigate('/products', { replace: true })

            })

            .catch((error) => {

                toast.error(error)
            })


    }






    return (
        <Fragment>


            <Row>
                <h1 className='app-heading '>Products Details </h1>
                <Col lg={3} md={6}></Col>
                <Col lg={6} md={12}>
                    {filteredProduct.map((item: any) => (


                        <Card className="card-show" style={{ width: '25rem', minHeight: '30rem' }}>
                            <Card.Img className="card-img-show" variant="top" src={item.img} />

                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Title>&#8377;{item.price}</Card.Title>
                                <Card.Title>Quantity - {item.quantity}</Card.Title>
                                <Card.Text>
                                    {item.desc}

                                </Card.Text>



                                <Link to={`/products/edit/${item._id}`} ><Button className='me-2' variant="warning">Edit</Button></Link>
                                <Button className='me-2' variant="danger" onClick={() => deleteHandler(item._id)} >Delete</Button>
                                <Link to="/products" ><Button className='me-2' variant="secondary">Return</Button></Link>
                            </Card.Body>
                        </Card>
                    ))}
                </Col>

                <Col lg={3} md={6}></Col>
            </Row>
        </Fragment>
    )
}

export default ShowProduct