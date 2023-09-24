import React from 'react'
import { Nav, Navbar, Container, FormControl, Dropdown, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'
import { CartState } from '../context/Context';
import { AiFillDelete } from 'react-icons/ai';
import './styles.css';

const Header = () => {

    const { state: { cart }, dispatch, productDispatch } = CartState()
    return (
        <Navbar bg='dark' variant='dark' style={{ height: 80 }}>
            <Container>
                <Navbar.Brand>
                    <Link to='/'>Shopping Cart</Link>
                </Navbar.Brand>
                {/* <Link to='/'>Shopping Cart</Link> */}
                <Navbar.Text className='search'>
                    <FormControl onChange={(e) => 
                    productDispatch({
                        type:'Filter_By_Search',
                        payload:e.target.value,
                    })
                    } style={{ width: 500 }} placeholder='Search a product' className='m-auto' />
                </Navbar.Text>
                <Nav>
                    <Dropdown>
                        <Dropdown.Toggle variant='success'>
                            <FaShoppingCart color='#fff' fontSize='25px' style={{ marginRight: 5 }} />
                            <Badge>{cart.length}</Badge>
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ minWidth: 370 }}>
                            {cart.length > 0 ? (
                                <>
                                    {cart.map((product) => (
                                        <span className="cartItem" key={product.id}>
                                            <img
                                                src={product.images[0]}
                                                className="cartItemImg"
                                                alt={product.title}
                                            />
                                            <div className="cartItemDetail">
                                                <span>{product.title}</span>
                                                <span>₹ {product.price}</span>
                                            </div>
                                            <AiFillDelete
                                                fontSize="20px"
                                                style={{ cursor: "pointer" }}
                                                onClick={() =>
                                                    dispatch({
                                                        type: "Remove_From_Cart",
                                                        payload: product,
                                                    })
                                                }
                                            />
                                        </span>
                                    ))}
                                    <Link to="/cart">
                                        <Button style={{ width: "95%", margin: "0 10px" }}>
                                            Go To Cart
                                        </Button>
                                    </Link>
                                </>
                            ) : (
                                <span style={{ padding: 10 }}>Cart is Empty!</span>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header