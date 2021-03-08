import React from 'react'

function Footer ()
{
    return (

    <footer className="footer pt-4">
      <div className="container bg-dark text-light">
       
            <div className="footer-cta pt-5 pb-5">
                <div className="row">
                    <div className="col-xl-4 col-md-4 mb-30">
                        <div className="single-cta">
                            <i className="fas fa-map-marker-alt"></i>
                          <div className="cta-text">
                                <h4>Find us</h4>
                                <span>123 Rd San Diego CA 12345</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-md-4 mb-30">
                        <div className="single-cta">
                            <i className="fas fa-phone"></i>
                            <div className="cta-text">
                                <h4>Call us</h4>
                                <span>1234567890</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-md-4 mb-30">
                        <div className="single-cta">
                            <i className="far fa-envelope-open"></i>
                            <div className="cta-text">
                                <h4>Mail us</h4>
                                <span>contact@info.com</span>
                            </div>
                        </div>
                    </div>
                </div>
          </div>
           <div className="row pt-4">
            <div className="col-xl-6 col-lg-6 text-center text-lg-left">
                        <div className="copyright-text">
                            <p>Copyright &copy; 2021, All Right Reserved <a href="#">juniStore</a></p>
                        </div>
            </div>
             <div className="col-xl-6 col-lg-6 text-center text-lg-right pb-4">
                        <div className="copyright-text">
                <p>Online Store icon by <a href="https://icons8.com/icon/77114/online-store">Icons8</a></p>
                <p>Product Photos on <a href="https://unsplash.com/">Unplash</a></p>
                        </div>
              </div>
          </div>
          </div>
           
    </footer>

    )
}

export default Footer