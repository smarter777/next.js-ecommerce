import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import Notify from './Notify'
import Modal from './Modal'

function Layout({children}) {
    return (
        <div className="container">
            <NavBar />
            <Notify />
            <Modal />
            {children }
            <Footer/>
        </div>
    )
}

export default Layout
