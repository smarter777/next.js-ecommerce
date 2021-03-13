import Head from 'next/head'
import { useContext, useState, useEffect } from 'react'
import { DataContext } from '../store/GlobalState'
import CartItem from '../components/CartItem'
import Link from 'next/link'
import { getData, postData } from '../utils/fetchData'
import { useRouter } from 'next/router'

const Cart = () => {
  const { state, dispatch } = useContext(DataContext)
  const { cart, auth, orders } = state

  const [ total, setTotal ] = useState( 0 )
  const [ shippingFee, setShippingFee ] = useState( 10 )
   const [subTotal, setSubTotal ] = useState(0)

  const [address, setAddress] = useState('')
  const [mobile, setMobile] = useState('')

  const [callback, setCallback] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const getTotal = () => {
      const res = cart.reduce((prev, item) => {
        return prev + (item.price * item.quantity)
      }, 0 )
  
      setSubTotal( res )
      res > 30 ? setTotal(res) : setTotal(shippingFee + res)
      
    }
    
    getTotal()
   
  }, [cart ] )
  
   useEffect(() => {
    const cartLocal = JSON.parse(localStorage.getItem('ecommerce_next'))
    if(cartLocal && cartLocal.length > 0){
      let newArr = []
      const updateCart = async () => {
        for (const item of cartLocal){
          const res = await getData(`product/${item._id}`)
          const { _id, title, images, price, inStock, sold } = res.product
          if(inStock > 0){
            newArr.push({ 
              _id, title, images, price, inStock, sold,
              quantity: item.quantity > inStock ? 1 : item.quantity
            })
          }
        }

        dispatch({ type: 'ADD_CART', payload: newArr })
      }

      updateCart()
    } 
  },[callback])

  const handlePayment = async () => {
    if(!address || !mobile)
    return dispatch({ type: 'NOTIFY', payload: {error: 'Please add your delivery address and contact number.'}})

    let newCart = [];
    for(const item of cart){
      const res = await getData(`product/${item._id}`)
      if(res.product.inStock - item.quantity >= 0){
        newCart.push(item)
      }
    }
    
    if(newCart.length < cart.length){
      setCallback(!callback)
      return dispatch({ type: 'NOTIFY', payload: {
        error: 'The product is out of stock or the quantity is insufficient.'
      }})
    }

    dispatch({ type: 'NOTIFY', payload: {loading: true} })

    postData('order', {address, mobile, cart, total}, auth.token)
    .then(res => {
      if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err} })

      dispatch({ type: 'ADD_CART', payload: [] })
      
      const newOrder = {
        ...res.newOrder,
        user: auth.user
      }
      dispatch({ type: 'ADD_ORDERS', payload: [...orders, newOrder] })
      dispatch({ type: 'NOTIFY', payload: {success: res.msg} })
      return router.push(`/order/${res.newOrder._id}`)
    })

  }
  
  if( cart.length === 0 ) 
    return <>
      <div className="col-md-5 p-lg-4 mx-auto my-1">
        <p className="lead fw-normal">Your Shopping Cart Is Empty, Add Your Favorite Products and Continue Shopping!</p>
      </div>
    
      <img className="img-fluid w-50 mt-5" src="/empty_cart.svg" alt="empty cart" /></>

    return(
      <div className="mx-auto">
        <Head>
          <title>Cart Page</title>
        </Head>
          <div className="mt-4 mb-4">
                <button className="btn btn-info" onClick={() => router.back()}>
                    <i className="fas fa-long-arrow-alt-left" aria-hidden="true"></i> Go Back
                </button>
        </div>
        
        <div className='row'>
        <div className="col-md-8 text-secondary table-responsive my-3">
          <h2 className="text-uppercase">Shopping Cart</h2>

          <table className="table my-3">
            <tbody>
              {
                cart.map(item => (
                  <CartItem key={item._id} item={item} dispatch={dispatch} cart={cart} />
                ))
              }
            </tbody>
          </table>
        </div>

        <div className="col-md-4 my-3 text-right text-uppercase text-secondary">
          
          <h3>Checkout Information</h3>
            <form>
      
              <label htmlFor="address">Delivery Address</label>
              <input type="text" name="address" id="address" placeholder="Type your delivery address here"
              className="form-control mb-2" value={address}
              onChange={e => setAddress(e.target.value)} />

              <label htmlFor="mobile">Contact Number</label>
              <input type="text" name="mobile" id="mobile" placeholder="Type your contact number here"
              className="form-control mb-2" value={mobile}
              onChange={e => setMobile(e.target.value)} />
          </form>

          <h3 className='pt-4'>Your Order Total</h3>
          
          <h6>subTotal: <span className="text-info">${subTotal}</span></h6>
          <h6>Shipping Fee (free for orders over $30): <span className="text-danger">${subTotal > 30? 0: shippingFee}</span></h6>

          <h4>Total: <span className="text-danger">${total}</span></h4>

            
            <Link href={auth.user ? '#!' : '/signin'}>
              <a className="slide btn d-block my-3 px-5" style={ { background: '#8bd3dd' } } data-hover='Proceed with Payment' onClick={handlePayment}><div><i className="far fa-credit-card"></i></div></a>
            </Link>
            
        </div>
        </div>
        </div>
    )
  }
  
export default Cart