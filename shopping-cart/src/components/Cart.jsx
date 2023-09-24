import React, { useEffect, useState } from 'react'
import { CartState } from '../context/Context'
import { Form, Button, Col, ListGroup, Row, Image } from 'react-bootstrap'
import Rating from './Rating';
import { AiFillDelete } from 'react-icons/ai';


const Cart = () => {

    const { state: { cart }, dispatch, } = CartState()
    console.log(cart)

    const [total, setTotal] = useState()

    useEffect(() => {
        setTotal(cart.reduce((acc, curr) => acc + +(curr.price) * curr.qty, 0))
    }, [cart])
    return (
        <div className='home'>
            <div className='productContainer'>
                <ListGroup>
                    {cart.map((prod) => (
                        <ListGroup.Item key={prod.id}>
                            <Row>
                                <Col md={2}>
                                    <Image src={prod.images[0]} alt={prod.title} fluid rounded />
                                </Col>
                                <Col md={2}>
                                    <span>{prod.title}</span>
                                </Col>
                                <Col md={2}>₹ {prod.price}</Col>
                                <Col md={2}>
                                    <Rating rating={prod.rating} />
                                </Col>
                                <Col md={2}>
                                    <Form.Control as='select'
                                        onChange={(e) =>
                                            dispatch({
                                                type:'Change_Cart_Qty',
                                                payload:{
                                                    id:prod.id,
                                                    qty:e.target.value
                                                }
                                            })}
                                        value={prod.qty}>
                                        {[...Array(prod.stock).keys()].map((x) => (
                                            <option key={x + 1}>{x + 1}</option>
                                        ))}
                                    </Form.Control>
                                </Col>
                                <Col md={2}>
                                    <Button
                                        type="button"
                                        variant="light"
                                        onClick={() =>
                                            dispatch({
                                                type: "Remove_From_Cart",
                                                payload: prod,
                                            })
                                        }
                                    >
                                        <AiFillDelete fontSize="20px" />
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
            <div className='filters summary'>
                <span className='title'>
                    Subtotal ({cart.length}) items
                </span>
                <span style={{ fontWeight: 700, fontSize: 20 }}>Total : $ {total}</span>
                <Button type='button' disabled={cart.length === 0}>Proceed to Chekout</Button>
            </div>
        </div>
    )
}
export default Cart