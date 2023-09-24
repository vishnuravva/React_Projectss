import React from 'react'
import { Card, Button } from 'react-bootstrap'
import Rating from './Rating'
import { CartState } from '../context/Context'


const SingleProduct = ({ product }) => {

    const { state: { cart }, dispatch } = CartState()
    // console.log(cart)
    return (
        <div className='products'>
            <Card>
                <Card.Img className='img' variant='top' src={product.images[0]} />
                <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Subtitle style={{ paddingBottom: 10 }}>
                        <span>$ {product.price}</span>
                        {
                            product.fastDelivery ? (
                                <div>FastDelivery</div>
                            )
                                :
                                (
                                    <div>4 days delivery</div>
                                )
                        }
                        <Rating rating={product.rating} />
                    </Card.Subtitle>
                    {
                        cart.some((p) => p.id === product.id)
                            ?
                            (
                                <Button onClick={() => {
                                    dispatch({
                                        type: 'Remove_From_Cart',
                                        payload: product
                                    });
                                }} variant='danger'>Remove From Cart</Button>
                            )
                            :
                            (
                                <Button onClick={() => {
                                    dispatch({
                                        type: 'Add_To_Cart',
                                        payload: product
                                    });
                                }} 
                                disabled={!product.stock}
                                >
                                    {!product.stock ? 'Out of Stock' : 'Add to Cart'}
                                </Button>
                            )
                    }
                </Card.Body>
            </Card>
        </div>
    )
}
export default SingleProduct