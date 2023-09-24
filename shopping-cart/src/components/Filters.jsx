import { React, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import Rating from './Rating';
import { CartState } from '../context/Context';

const Filters = () => {

    const [rate, setRate] = useState(0);

    const { productState: { byStock, byFastDelivery, sort, byRating,searchQuery }, productDispatch } = CartState()
    console.log(byStock, byFastDelivery, sort, byRating,searchQuery)

    return (
        <div className='filters'>
            <span className='title'>Filter Products</span>
            <span>
                <Form.Check inline
                    label='Ascending'
                    name='group1'
                    type='radio'
                    id={`inline-1`}
                    onChange={(i) =>
                        productDispatch({
                            type: 'Sort_By_Price',
                            payload: 'lowToHigh',

                        })}
                    checked={sort === 'lowToHigh' ? true : false}
                />
            </span>
            <span>
                <Form.Check inline
                    label='Descending'
                    name='group1'
                    type='radio'
                    id={`inline-2`}
                    onChange={(i) =>
                        productDispatch({
                            type: 'Sort_By_Price',
                            payload: 'highToLow',

                        })}
                    checked={sort === 'highToLow' ? true : false}
                />
            </span>
            <span>
                <Form.Check inline
                    label='Include Out of Stock'
                    name='group1'
                    type='checkbox'
                    id={`inline-3`}
                    onChange={(i) =>
                        productDispatch({
                            type: 'Filter_By_Stock',
                        })}
                    checked={byStock}
                />
            </span>
            <span>
                <Form.Check inline
                    label='Fast Delivery Only'
                    name='group1'
                    type='checkbox'
                    id={`inline-4`}
                    onChange={(i) =>
                        productDispatch({
                            type: 'Filter_By_Delivery',
                        })}
                    checked={byFastDelivery}
                />
            </span>
            <span>
                <label style={{ paddingRight: 10 }}>Rating:</label>
                <Rating rating={byRating} onClick={(i) =>
                    productDispatch({
                        type: 'Filter_By_Rating',
                        payload: i + 1,

                    })} style={{ cursor: 'pointer' }} />
            </span>
            <Button variant='light' onClick={() =>
                productDispatch({
                    type: 'Clear_Filters',
                })
            }>Clear Filters</Button>
        </div>
    )
}

export default Filters