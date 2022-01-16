import React, {useState, useEffect} from 'react'
import filterSearch from '../utils/filterSearch'
import {useRouter} from 'next/router'

const Filter = ({state}) => {
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('')
    const [category, setCategory] = useState('')

    const {categories} = state

    const router = useRouter()


    const handleCategory = (e) => {
        setCategory(e.target.value)
        filterSearch({router, category: e.target.value})
    }

    const handleSort = (e) => {
        setSort(e.target.value)
        filterSearch({router, sort: e.target.value})
    }

    useEffect(() => {
        filterSearch({router, search: search ? search.toLowerCase() : 'all'})
    },[search])

    return (
        
    <div className="position-relative overflow-hidden p-2 p-md-4 m-md-2 text-center">
    <div className="col-md-5 p-lg-4 mx-auto my-1">
    <h1 className="display-5 fw-normal">Welcome to <div className="p-3 mx-auto text-center"><span style={{
  'fontSize': '50px','display': 'inline-block','lineHeight': '0.1em', 'borderBottom': '0.3em solid pink',
    } }>juniStore</span></div></h1>
      <p className="lead fw-normal">Customers can find favorite products sold by our partner merchandises. Sellers can <span style={{
  'fontSize': '20px','display': 'inline-block','lineHeight': '0.1em', 'borderBottom': '0.3em solid pink',
    } }><a href="#footer">contact Juni </a></span> for showing products here!</p>
    </div>
    
        <div className="input-group" style={{marginTop: '2rem', marginBottom: '2rem'}}>
            <div className="input-group-prepend col-md-2 p-2 bg-dark rounded rounded-pill shadow-sm mb-4">
                <select className="custom-select text-capitalize text-white rounded rounded-pill border-0 bg-info"
                value={category} onChange={handleCategory}>

                    <option value="all">All Products</option>

                    {
                        categories.map(item => (
                            <option key={item._id} value={item._id}>{item.name}</option>
                        ))
                    }
                </select>
            </div>

            <div className="col-md-8 p-2 bg-dark rounded rounded-pill shadow-sm mb-4">
            <div className="input-group">
            <input list="title_product" type="search" placeholder="Searching our products here" aria-describedby="search-button" className="form-control text-white rounded rounded-pill border-0 bg-info"
                value={search.toLowerCase()} onChange={e => setSearch(e.target.value)} />
            <div className="input-group-append">
              <button id="search-button" type="button" className="btn btn-link text-info"><i className="fa fa-search"></i></button>
            </div>
            </div>
            </div>

            <div className="input-group-prepend col-md-2 p-2 bg-dark rounded rounded-pill shadow-sm mb-4">
                <select className="custom-select text-capitalize text-white rounded rounded-pill border-0 bg-info"
                value={sort} onChange={handleSort}>

                     <option value="-createdAt">Newest</option>
                     <option value="oldest">Oldest</option>
                     <option value="-sold">Best sales</option>
                     <option value="-price">Price: Hight-Low</option>
                     <option value="price">Price: Low-Hight</option>

                </select>
            </div>

            </div>

        </div>
    )
}

export default Filter
