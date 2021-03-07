const Toast = ({msg, handleShow, bgColor, txtColor}) => {
    return(
        <div className={`toast show position-fixed ${bgColor} ${txtColor}`}
        style={{ top: '5px', right: '5px', zIndex: 9, minWidth: '280px' }} >

            <div className={`toast-header ${txtColor}`}>
                <strong className="mr-auto text-dark">{msg.title}</strong>

                <button type="button" className="ml-2 mb-1 close text-dark" 
                data-dismiss="toast" style={{ outline: 'none'}} 
                onClick={handleShow}>x</button>
            </div>

            <div className="toast-body">{msg.msg}</div>

        </div>
    )
}

export default Toast