import React, { useRef } from 'react'
import { Navbar, Container, Nav, Form, Button } from 'react-bootstrap';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, authActions, productFilteredListActions } from '../../store/Store';
import axios from 'axios'
import { toast } from 'react-toastify';



const Header: React.FC<{}> = () => {

  const isLoggedIn = useSelector<RootState>((item) => item.auth.isLoggedIn)
  const username = localStorage.getItem("username")
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const logoutHandler = () => {
    axios.get('/logout',)
      .then((response) => {
        if (response.status !== 200) {
          toast.error("Something went wrong!")
          dispatch(authActions.isLoggedIn(false))
          localStorage.clear()
          navigate('/login', { replace: true })
          return
        }
        else {
          console.log("Logout Response ", response)
          toast.error("LoggedOut Sucessfully!")
          dispatch(authActions.isLoggedIn(false))
          localStorage.clear()
          navigate('/login', { replace: true })
        }


      })

      .catch((error) => {

        toast.error(error)
      })


  }



  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault()
    const searchValue = inputRef.current!.value



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
    <Navbar className="nav" fixed='top' collapseOnSelect expand="lg" variant="dark">
      <Container>
        <Navbar.Brand className='app-title me-3' >Shop-Top</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">

            <Link className="NavLink me-3" to="/products">

              Home

            </Link>


            {isLoggedIn ?
              <Link className="NavLink" to="/products/add">

                Add Product

              </Link> : null}



          </Nav>

          {/* {isLoggedIn && username !== null ? <Nav className="me-auto"><h5 className='username'>{`Hello ${username.trim()} !`}</h5>   </Nav> : null} */}
          <Nav className="me-auto">

            <Form className="d-flex" onSubmit={submitHandler}>
              <Form.Control
                type="search"
                placeholder="Search Product Name"
                className="me-2"
                aria-label="Search"
                ref={inputRef}



              />
              <Button variant="outline-success" type='submit'>Search</Button>
            </Form>

          </Nav>
          <Nav className="ms-auto">
            {isLoggedIn ? <Link onClick={logoutHandler} className="NavLink" to="/logout">

              Logout

            </Link>
              :
              <Link className="NavLink" to="/login">

                Login

              </Link>}






          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header