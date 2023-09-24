import React from 'react'
import { CartState } from '../context/Context'
import SingleProduct from './SingleProduct'
import './styles.css'
import Filters from './Filters'

const Home = () => {

    const { state: { products },
        productState: { byStock, byFastDelivery, sort, byRating, searchQuery }
    } = CartState()

    const transformProducts = () => {
        let sortedProducts = products;

        if (sort){
            sortedProducts = sortedProducts.sort((a,b) =>
                sort === 'lowToHigh' ? a.price - b.price : b.price - a.price
            )
        }

        if(!byStock){
            sortedProducts = sortedProducts.filter((prod) => prod.stock)
        }
        if(byFastDelivery){
            sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery)
        }
        if(byRating){
            sortedProducts = sortedProducts.filter((prod) => prod.rating >= byRating)
        }
        if(searchQuery){
            sortedProducts = sortedProducts.filter((prod) => prod.title.toLowerCase().includes(searchQuery))
    }
        return sortedProducts
    }
    
    return (
        <div className='home'>
            <Filters />
            <div className='productContainer'>
                {
                    transformProducts().map((product) => {
                        return <SingleProduct product={product} key={product.id} />
                    })
                }
            </div>
        </div>
    )
}

export default Home