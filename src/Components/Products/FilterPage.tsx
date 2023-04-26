import React, { Fragment, useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { Row, Card, Col } from 'react-bootstrap'
import { toast } from 'react-toastify'
import './Home.css'
import Product from '../../models/product'
import { RootState, authActions, productListActions } from '../../store/Store'




const FilterPage: React.FC<{ productId: (productId: any) => void }> = (props) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const products: any = useSelector<RootState>((item) => item.filteredProducts.productList)










    const productIdHandler = (id: string) => {
        props.productId(id)
    }




    return (
        <Fragment>


            {

                products.length > 0 ? products.map((item: any) => (
                    <Row>

                        <Col lg={3} md={6} sm={12}>
                            <Card className="card mb-5" style={{ width: '15rem', height: '25rem' }}>
                                <Card.Img className="card-img" variant="top" src={item.img} />
                                <Card.Body>
                                    <Card.Title>{item.name}</Card.Title>
                                    <Card.Title>&#8377;{item.price}</Card.Title>
                                    <Card.Text>
                                        {item.desc.substring(0, 50) + "..."}
                                    </Card.Text>

                                </Card.Body>
                                <Link to={`/products/${item._id}`} > <Button onClick={() => productIdHandler(item._id)} className="btn btn-primary view-btn " variant="primary"> View</Button> </Link>
                            </Card>

                        </Col></Row>
                )) : <div><h2>No Results!</h2>
                    <Link to="/products"> <Button className='mt-3' style={{ "minWidth": "12vw" }} variant='secondary'>GO Back</Button></Link>
                </div>
            }
        </Fragment>
    )
}

export default FilterPage