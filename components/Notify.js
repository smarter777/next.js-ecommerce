import {useContext} from 'react'
import {DataContext} from '../store/GlobalState'
import Loading from './Loading'
import Toast from './Toast'

const Notify = () => {
    const {state, dispatch} = useContext(DataContext)
    const { notify } = state

    return(
        <> 
            {notify.loading && <Loading />}
            {notify.error && 
                <Toast
                    msg={{ msg: notify.error, title: "Sorry, please fix this first!" }}
                    handleShow={() => dispatch({ type: 'NOTIFY', payload: {} })}
                    bgColor="bg-warning"
                    txtColor="text-dark"
                />
            }

            {notify.success && 
                <Toast
                msg={{ msg: notify.success, title: "Welldone 👍" }}
                handleShow={() => dispatch({ type: 'NOTIFY', payload: {} })}
                bgColor="bg-info"
                txtColor="text-light"
                
                />
            }
        </>
    )
}


export default Notify
