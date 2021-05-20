import Head from 'next/head'
import {useState, useContext, useEffect} from 'react'
import {DataContext} from '../../store/GlobalState'
import {imageUpload} from '../../utils/imageUpload'
import {postData, getData, putData} from '../../utils/fetchData'
import {useRouter} from 'next/router'

const ProductsManager = () => {
    const initialState = {
        title: '',
        seller: '',
        price: 0,
        inStock: 0,
        description: '',
        category: 'all',
      
    }
    const [ product, setProduct ] = useState( initialState )
    const [disabled, setDisabled] = useState(true);
    const {title, seller, price, inStock, description, category} = product

    const [ images, setImages ] = useState( [] )
  
    const {state, dispatch} = useContext(DataContext)
    const {categories, auth} = state

    const router = useRouter()
    const {id} = router.query
    const [ onEdit, setOnEdit ] = useState( false )
    
    // Whenever the product state changes, run the useEffect function
	useEffect(() => {
		// The Object.values() method returns an array of values of the object passed in
		// The every() method takes a callback and loops through the values array
		// For every element in every() method, call the Boolean method on it
		// The Boolean method will return true or false if the element is empty or not
		const isProduct = Object.values(product).every((el) => Boolean(el));
		isProduct ? setDisabled(false) : setDisabled(true);
	}, [product]);

    useEffect(() => {
        if(id){
            setOnEdit(true)
            getData(`product/${id}`).then(res => {
                setProduct(res.product)
                setImages(res.product.images)
            })
        }else{
            setOnEdit(false)
            setProduct(initialState)
            setImages([])
        }
    },[id])

    const handleChangeInput = e => {
        const {name, value} = e.target
        setProduct({...product, [name]:value})
        dispatch({type: 'NOTIFY', payload: {}})
    }

    const handleUploadInput = e => {
        dispatch({type: 'NOTIFY', payload: {}})
        let newImages = []
        let num = 0
        let err = ''
        const files = [...e.target.files]

        if(files.length === 0) 
        return dispatch({type: 'NOTIFY', payload: {error: 'Files does not exist.'}})

        files.forEach(file => {
            if(file.size > 10240 * 10240)
            return err = 'The largest image size is 10mb'

            if(file.type !== 'image/jpeg' && file.type !== 'image/png')
            return err = 'Image format is incorrect.'

            num += 1;
            if(num <= 5) newImages.push(file)
            return newImages;
        })

        if(err) dispatch({type: 'NOTIFY', payload: {error: err}})

        const imgCount = images.length
        if(imgCount + newImages.length > 5)
        return dispatch({type: 'NOTIFY', payload: {error: 'Select up to 5 images only!'}})
        setImages([...images, ...newImages])
    }

    const deleteImage = index => {
        const newArr = [...images]
        newArr.splice(index, 1)
        setImages(newArr)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(auth.user.role !== 'admin') 
        return dispatch({type: 'NOTIFY', payload: {error: 'Authentication is not valid.'}})

        if(!title || !seller || !price || !inStock || !description || images.length === 0)
        return dispatch({type: 'NOTIFY', payload: {error: 'Please add all the fields.'}})

    
        dispatch({type: 'NOTIFY', payload: {loading: true}})
        let media = []
        const imgNewURL = images.filter(img => !img.url)
        const imgOldURL = images.filter(img => img.url)

        if(imgNewURL.length > 0) media = await imageUpload(imgNewURL)

        let res;
        if(onEdit){
            res = await putData(`product/${id}`, {...product, images: [...imgOldURL, ...media]}, auth.token)
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
        }else{
            res = await postData('product', {...product, images: [...imgOldURL, ...media]}, auth.token)
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
        }

        return dispatch({type: 'NOTIFY', payload: {success: res.msg}})
        
    }

    return(
        <div className="products_manager mt-4">
            <Head>
                <title>Products Manager</title>
            </Head>

             <div>
                <button className="btn btn-info mb-4" onClick={() => router.back()}>
                    <i className="fas fa-long-arrow-alt-left" aria-hidden="true"></i> Go Back
                </button>
            </div>

            <h5>Please add all fields and upload images of your product as below:</h5>
            <form className="row" onSubmit={handleSubmit}>
                <div className="col-md-6">
                    
                    <input type="text" name="title" value={title}
                    placeholder="Title" className="d-block my-4 w-100 p-2"
                    onChange={ handleChangeInput } />
                    
                     <input type="text" name="seller" value={seller}
                    placeholder="Seller" className="d-block my-4 w-100 p-2"
                    onChange={handleChangeInput} />

                    <div className="row">
                        <div className="col-sm-6">
                            <label htmlFor="price">Price</label>
                            <input type="number" name="price" value={price}
                            placeholder="Price" className="d-block w-100 p-2"
                            onChange={handleChangeInput} />
                        </div>

                        <div className="col-sm-6">
                            <label htmlFor="price">In Stock</label>
                            <input type="number" name="inStock" value={inStock}
                            placeholder="inStock" className="d-block w-100 p-2"
                            onChange={handleChangeInput} />
                        </div>
                    </div>

                    <textarea name="description" id="description" cols="30" rows="4"
                    placeholder="Description" onChange={handleChangeInput}
                    className="d-block my-4 w-100 p-2" value={description} />


                    <div className="input-group-prepend px-0 my-2">
                        <select name="category" id="category" value={category}
                        onChange={handleChangeInput} className="custom-select text-capitalize">
                            <option value="all">All Products</option>
                            {
                                categories.map(item => (
                                    <option key={item._id} value={item._id}>
                                        {item.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    { onEdit ?

                        <button type="submit" className="btn my-2 px-4" style={ { background: '#f582ae' } } >
                            Update
                    </button> :
                        <button type="submit" className="btn my-2 px-4" style={ { background: '#f582ae' } } disabled={ disabled }>
                            Create
                    </button>
                    }

                </div>

                <div className="col-md-6 my-4 bg-info rounded">
                    <div className="input-group mb-3">
                      
                        <div className="custom-file border-0 p-2 mt-3 rounded rounded-pill bg-dark text-white">
                          
                        <input type="file" className="rounded rounded-pill bg-dark form-control-file " 
                            onChange={handleUploadInput} multiple accept="image/*" />
                        </div>

                    </div>
                    
                     <p className="text-white">Upload up to 5 images only!</p>

                    <div className="row img-up mx-0">
                        {
                            images.map((img, index) => (
                                <div key={index} className="file_img my-1">
                                    <img src={img.url ? img.url : URL.createObjectURL(img)}
                                     alt="" className="img-thumbnail rounded" />

                                     <span onClick={() => deleteImage(index)}>X</span>
                                </div>
                            ))
                        }
                    </div>
                        

                </div>

               
            </form>

             <button onClick={() => router.back()} className="btn my-2 px-4" style={ { background: '#f582ae' } } >
                            Cancel
            </button>

            
        </div>
    )
}

export default ProductsManager