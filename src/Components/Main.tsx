import React, { Fragment, useState } from 'react'

import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'




import SingUp from './Auth/SingUp'
import Login from './Auth/Login'
import { RootState } from '../store/Store'
import Home from './Products/Home'
import Layout from './layouts/Layout'
import AddProduct from './Products/AddProduct'
import Show from './Products/ShowProduct'
import ShowProduct from './Products/ShowProduct'
import Product from '../models/product'
import EditProduct from './Products/EditProduct'
import FilterPage from './Products/FilterPage'


export default function Main() {


    const [userData, setUserData] = useState<Product[]>([])
    const [productId, setProductId] = useState<string>('')
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)



    const getLoginUserResponse = (data: Product[]) => {
        setUserData(data)
    }

    const getProductId = (pId: string) => {
        setProductId(pId)
    }
    return (
        <Fragment>
            <Layout>
                <Routes>


                    <Route path='/' element={<Navigate to="/products" />} />
                    <Route path='/products' element={<Home productId={getProductId} />} />
                    <Route path='/register' element={<SingUp />} />
                    <Route path='/login' element={<Login loginUserResponse={getLoginUserResponse} />} />
                    {isLoggedIn ? <Route path='/products/add' element={<AddProduct />} /> : <Route path='/products/add' element={<Navigate to="/login" />} />}
                    <Route path='/products/:id' element={<ShowProduct productId={productId} />} />
                    {isLoggedIn ? <Route path='/products/edit/:id' element={<EditProduct productId={productId} />} /> : <Route path='/products/edit/:id' element={<Navigate to="/login" />} />}
                    <Route path='/products/find/:value' element={<FilterPage productId={getProductId} />} />


                </Routes>
            </Layout>
        </Fragment>
    )
}
