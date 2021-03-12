import Link from 'next/link'
import { useContext, useState } from 'react'
import { DataContext } from '../../store/GlobalState'
import { addToCart } from '../../store/Actions'

const ProductItem = ({product, handleCheck}) => {
    const { state, dispatch } = useContext(DataContext)
    const { cart, auth } = state
    const [ clicked, setClicked ] = useState( false )

    const userLink = () => {
        return(
            <>
                <Link href={`product/${product._id}`}>
                    <a className="btn slide"
                        data-hover="View"
                        style={ { marginRight: '5px', flex: 1, background: '#f582ae' } }>
                         <div>
                            <i className="fas fa-eye pl-2"></i>
                        </div>
                    </a>
                 
                </Link>

                              
                <button className="cart-btn btn btn-info"
                   
                    style={ { marginLeft: '5px', flex: 1 } }
                    disabled={ product.inStock === 0 ? true : false }
                    onClick={ () => { dispatch( addToCart( product, cart ) ); setClicked( true ); } } >
                   
                    { clicked ? "Item Added to Cart" : "Add to Cart" }
                        <i className="fas fa-cart-plus pl-2"></i>
                  
                </button>
            </>
        )
    }

    const adminLink = () => {
        return(
            <>
                <Link href={`create/${product._id}`}>
                    <a className="btn btn-warning slide"
                    data-hover="Edit"
                        style={ { marginRight: '5px', flex: 1 } }>
                    <div><i className="fas fa-edit"></i></div>
                 
                 </a>
                </Link>
                 <Link href={`product/${product._id}`}>
                    <a className="btn slide"
                        data-hover="View"
                        style={ { marginRight: '5px', flex: 1, background: '#8bd3dd' } }>
                         <div>
                            <i className="fas fa-eye pl-2"></i>
                        </div>
                    </a>
                 
                </Link>
                <button className="btn slide"
                data-hover="Delete"
                style={{marginLeft: '5px', flex: 1, background: '#f582ae'}}
                data-toggle="modal" data-target="#exampleModal"
                onClick={() => dispatch({
                    type: 'ADD_MODAL',
                    payload: [{ 
                        data: '', id: product._id, 
                        title: product.title, type: 'DELETE_PRODUCT' 
                    }]
                } ) } >
                    <div><i className="fas fa-trash-alt"></i></div>
                  
                </button>
            </>
        )
    }

    return(
        <div className="card" style={{ width: '100%' }}>
            {
                auth.user && auth.user.role === 'admin' &&
                <input type="checkbox" checked={product.checked}
                className="position-absolute"
                style={{height: '20px', width: '20px'}}
                onChange={() => handleCheck(product._id)} />
            }
            <img className="card-img-top" src={product.images[0].url} alt={product.images[0].url} />
            <div className="card-body">
                <div className="row justify-content-between mx-0">
                <h5 className="card-title text-capitalize" title={product.title}>
                    {product.title}
                    </h5>
                   
                </div>

                <div className="row justify-content-between mx-0">
                    <h6 className="text-danger">${product.price}</h6>
                    {
                        product.inStock > 0
                        ? <h6 className="text-info">In Stock: {product.inStock}</h6>
                        : <h6 className="text-danger">Out Stock</h6>
                    }
                </div>

                <p className="card-text" title={product.description}>
                    {product.description}
                </p>
                    
                <div className="row justify-content-between mx-0">
                    {!auth.user || auth.user.role !== "admin"  ? userLink() : adminLink()}
                </div>
            </div>
        </div>
    )
}


export default ProductItem