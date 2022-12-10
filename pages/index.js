import Head from 'next/head'
import { useState, useContext, useEffect } from 'react'
import {DataContext} from '../store/GlobalState'

import { getData } from '../utils/fetchData'
import ProductItem from '../components/product/ProductItem'
import filterSearch from '../utils/filterSearch'
import {useRouter} from 'next/router'
import Filter from '../components/Filter'

const Home = (props) => {
  const [products, setProducts] = useState(props.products)

  const [isCheck, setIsCheck] = useState(false)
  const [page, setPage] = useState(1)
  const router = useRouter()

 let totalPage = 1


  const {state, dispatch} = useContext(DataContext)
  const {auth} = state

  useEffect(() => {
    setProducts(props.products)
  },[props.products])

  useEffect(() => {
    if(Object.keys(router.query).length === 0) setPage(1)
  },[router.query])

  const handleCheck = (id) => {
    products.forEach(product => {
      if(product._id === id) product.checked = !product.checked
    })
    setProducts([...products])
  }

  const handleCheckALL = () => {
    products.forEach(product => product.checked = !isCheck)
    setProducts([...products])
    setIsCheck(!isCheck)
  }

  const handleDeleteAll = () => {
    let deleteArr = [];
    products.forEach(product => {
      if(product.checked){
          deleteArr.push({
            data: '', 
            id: product._id, 
            title: 'Delete all selected products?', 
            type: 'DELETE_PRODUCT'
          })
      }
    })

    dispatch({type: 'ADD_MODAL', payload: deleteArr})
  }

  const handleLoadmore = () => {

    totalPage++
    
    setPage(page + 1)
   
    filterSearch({router, page: page + 1})
  }

  return(
    <div className="home_page">
      <Head>
        <title>Home Page</title>
      </Head>

      <Filter state={state} />

      {
        auth.user && auth.user.role === 'admin' &&
        <div className="delete_all btn btn-info mt-2 mb-4">
          <input type="checkbox" checked={isCheck} onChange={handleCheckALL}
          style={{width: '25px', height: '25px', transform: 'translateY(8px)'}} />

          <button className="btn ml-2" style={{ background: '#f582ae'}}
          data-toggle="modal" data-target="#exampleModal"
          onClick={handleDeleteAll}>
            CLICK TO DELETE ALL
          </button>
        </div>
      }

      <div className="">
        {
          products.length === 0 
          ? 
          
          <h2>No product found!</h2>

          :

          <>

          <h2>{`There are ${products.length * totalPage} products on this page!`}</h2>
          

          <div className="products">
         
           {products.map(product => (
   
        
            <ProductItem key={product._id} product={product} handleCheck={handleCheck} />
       
          ))}

          </div>


          </>
          
        }
        
      </div>
      
      {
        props.result < page * 9 ? ""

        : 

        <>
       
        {` Page: ${page}`}
        
        
        <button className="btn btn-outline-info d-block mx-auto mb-4"

            onClick={handleLoadmore}>

          Load more

        </button>

        </>
        
      }
    
    </div>
  )
}


export async function getServerSideProps({query}) {
  const page = query.page || 1
  const category = query.category || 'all'
  const sort = query.sort || ''
  const search = query.search || 'all'

  const res = await getData(
    `product?limit=${page * 9}&category=${category}&sort=${sort}&title=${search}`
  )
  // server side rendering
  return {
    props: {
      
      products: res.products,
      result: res.result
    }, // will be passed to the page component as props
  }
}

export default Home