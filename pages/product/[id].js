import Head from 'next/head'
import { useState, useContext } from 'react'
import { getData } from '../../utils/fetchData'
import { DataContext } from '../../store/GlobalState'
import { addToCart } from '../../store/Actions'
import { useRouter } from 'next/router'
import Link from 'next/link'

const DetailProduct = ( props ) =>
{
    
    const router = useRouter()
    const [product] = useState(props.product)
    const [ tab, setTab ] = useState( 0 )
    const [ clicked, setClicked ] = useState( false )

    const { state, dispatch } = useContext(DataContext)
    const { cart, auth } = state
    

    const isActive = (index) => {
        if(tab === index) return " active";
        return ""
    }

    return(
        <div className="row detail_page mt-4">
            <Head>
                <title>Product Details</title>
            </Head>

            <div>
                <button className="btn btn-info" onClick={() => router.back()}>
                    <i className="fas fa-long-arrow-alt-left" aria-hidden="true"></i> Go Back
                </button>
            </div>

            <div className='row'>
  
            <div className="col-md-6">
                <img src={ product.images[tab].url } alt={ product.images[tab].url }
                className="d-block img-thumbnail rounded mt-4 w-100"
                style={{height: '350px'}} />

                <div className="row mx-0" style={{cursor: 'pointer'}} >

                    {product.images.map((img, index) => (
                        <img key={index} src={img.url} alt={img.url}
                        className={`img-thumbnail rounded ${isActive(index)}`}
                        style={{height: '80px', width: '20%'}}
                        onClick={() => setTab(index)} />
                    ))}

                </div>
            </div>

            <div className="col-md-6 mt-3">
                    <h2 className="text-uppercase">{ product.title }</h2>
                    
                    <span className="badge rounded-pill bg-info text-light text-capitalize mb-4 p-2">Seller: { product.seller }</span>
                    <h5 className="text-danger">${product.price}</h5>

                <div className="row mx-0 d-flex justify-content-between">
                    {
                        product.inStock > 0
                        ? <h6 className="text-info">In Stock: {product.inStock}</h6>
                        : <h6 className="text-danger">Out Stock</h6>
                    }

                    <h6 className="text-danger">Sold: {product.sold}</h6>
                </div>

                <p className="my-2 product-desc">{product.description}</p>
              
                    { auth.user && auth.user.role === 'admin' ? "" :
                        <div className="row justify-content-between mx-0">
                        <button type="button" className="cart-btn btn btn-info d-block my-3 px-5"
                            disabled={ product.inStock === 0 ? true : false }
                            onClick={ () => { dispatch( addToCart( product, cart ) ); setClicked( true ); } } >
                            
                            { clicked ? "Item in Cart" : "Add to Cart" }
                             <i className="fas fa-cart-plus pl-2"></i>
                        </button>
                         <Link href="/cart">
                            <button data-hover='View Cart' type="button" className="slide btn d-block my-3 px-5"  
                                style={ { background: '#f582ae'} }>
                          
                            <div> <i className="fas fa-shopping-cart"></i></div>
                            </button>
                                
                        </Link>
                        </div>
                    }

                </div>
                </div>
        </div>
    )
}

export async function getServerSideProps({params: {id}}) {

    const res = await getData(`product/${id}`)
    // server side rendering
    return {
      props: { product: res.product }, // will be passed to the page component as props
    }
}


export default DetailProduct