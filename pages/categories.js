import Head from 'next/head'
import {useContext, useState} from 'react'
import {DataContext} from '../store/GlobalState'
import {updateItem} from '../store/Actions'
import { postData, putData } from "../utils/fetchData";
import { useRouter } from 'next/router'

const Categories = () =>
{
    
    const router = useRouter()
    const [name, setName] = useState('')

    const {state, dispatch} = useContext(DataContext)
    const {categories, auth} = state
    
    const [id, setId] = useState('')

    const createCategory = async () => {
        if(auth.user.role !== 'admin')
        return dispatch({type: 'NOTIFY', payload: {error: 'Authentication is not vaild.'}})

        if(!name) return dispatch({type: 'NOTIFY', payload: {error: 'Name can not be left blank.'}})

        dispatch({type: 'NOTIFY', payload: {loading: true}})

        let res;
        if(id){
            res = await putData(`categories/${id}`, {name}, auth.token)
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
            dispatch(updateItem(categories, id, res.category, 'ADD_CATEGORIES'))

        }else{
            res = await postData('categories', {name}, auth.token)
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})
            dispatch({type: "ADD_CATEGORIES", payload: [...categories, res.newCategory]})
        }
        setName('')
        setId('')
        return dispatch({type: 'NOTIFY', payload: {success: res.msg}})
    }

    const handleEditCategory = (category) => {
        setId(category._id)
        setName(category.name)
    }

    return(
        <div className="col-md-6 mx-auto my-3 mt-4">
            <Head>
                <title>Categories</title>
            </Head>

             <div>
                <button className="btn btn-info" onClick={() => router.back()}>
                    <i className="fas fa-long-arrow-alt-left" aria-hidden="true"></i> Go Back
                </button>
            </div>

            <div className="input-group mb-4 mt-5 p-2 bg-dark rounded rounded-pill shadow-sm">
                <input type="text" className="form-control text-white rounded rounded-pill border-0 bg-info"
                placeholder="Add a new category" value={name}
                onChange={e => setName(e.target.value)} />

                <button className="btn ml-1 rounded rounded-pill" style={{ background: '#f582ae'}}
                onClick={createCategory}>
                    {id ? "Update": "Create"}
                </button>
            </div>

            {
                categories.map(category => (
                    <div key={category._id} className="card my-2 text-capitalize">
                        <div className="card-body d-flex justify-content-between" style={{background: '#8bd3dd'}}>
                            { category.name }
                         
                            <div style={{cursor: 'pointer'}}>
                                <i className="fas fa-edit mr-2 text-info"
                                onClick={() => handleEditCategory(category)}></i>

                                <i className="fas fa-trash-alt text-danger"
                                data-toggle="modal" data-target="#exampleModal"
                                onClick={() => dispatch({
                                    type: 'ADD_MODAL',
                                    payload: [{ 
                                        data: categories, id: category._id, 
                                        title: category.name, type: 'ADD_CATEGORIES' 
                                    }]
                                })} ></i>
                            </div>

                        </div>
                    </div>
                ))
            }
           
        </div>
    )
}

export default Categories