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




const Home: React.FC<{ productId: (productId: any) => void }> = (props) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const products: any = useSelector<RootState>((item) => item.productList.productList)




    useEffect(() => {
        checkUserAuth()
        getProducts()
    }, [])




    async function checkUserAuth() {

        await axios.get("/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            },
        })
            .then((response) => {
                if (response.status !== 200) {
                    console.log("Something went wrong!")
                }
                else if (response.data === "Token not received!" || response.data.message === "you are failed to authenticate!") {
                    dispatch(authActions.isLoggedIn(false))
                }
                else {
                    console.log(" isAuthorized Response ", response)

                    dispatch(authActions.isLoggedIn(true))
                }



            })

            .catch((error) => {

                console.log(error)
            })


    }





    async function getProducts() {

        await axios.get('/products',)
            .then((response) => {
                if (response.status !== 200) {
                    toast.error("Something went wrong!")
                }


                console.log(" Products Response ", response)
                dispatch(productListActions.storeProducts(response.data))
            })

            .catch((error) => {
                console.log("err ", error)
                toast.error(error)
            })


    }



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
                ))
                    : <h3>NO DATA!</h3>}
        </Fragment>
    )
}

export default Home