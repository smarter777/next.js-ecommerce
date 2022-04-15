import React from 'react'

function Footer ()
{
    return (

    <footer className="footer pt-4" id="footer">
      <div className="container bg-dark text-light">
       
            <div className="footer-cta pt-5 pb-5">
                <div className="row">
                    <div className="col-xl-4 col-md-4 mb-30">
                        <div className="single-cta">
                            <i className="fas fa-map-marker-alt"></i>
                                <div className="cta-text">
                            <a href="https://www.google.com/maps/place/San+Diego,+CA/@32.8242404,-117.389167,10z/data=!3m1!4b1!4m5!3m4!1s0x80d9530fad921e4b:0xd3a21fdfd15df79!8m2!3d32.715738!4d-117.1610838" target="_blank" rel="noopener noreferrer">
                                <h4>Find Juni</h4>
                                <span>San Diego, CA</span>
                              </a>          
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-md-4 mb-30">
                        <div className="single-cta">
                             <i className="fab fa-facebook-messenger"></i>
                                <div className="cta-text">
                                 <a href="https://www.facebook.com/helloJuniNguyen" target="_blank" rel="noopener noreferrer">
                                <h4>Text Juni</h4>
                                <span>Hello Juni 👩‍💻</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-md-4 mb-30">
                        <div className="single-cta">
                            <i className="far fa-envelope-open"></i>
                                <div className="cta-text">
                                    <a href="mailto:jcontact@info.com" target="_blank" rel="noopener noreferrer">
                                    <h4>Mail Juni</h4>
                                    <span>hellojuninguyen@gmail.com</span>
                                    </a>
                            </div>
                        </div>
                    </div>
                </div>
          </div>
           <div className="row pt-4">
            <div className="col-xl-6 col-lg-6 text-center text-lg-left">
                        <div className="copyright-text">
                            <p>Copyright &copy; 2021, All Right Reserved <a href="https://hellojuninguyen.netlify.app/" target="_blank" rel="noopener noreferrer">juniStore</a></p>
                        </div>
            </div>
             <div className="col-xl-6 col-lg-6 text-center text-lg-right pb-4">
                        <div className="copyright-text">
                <p>Online Store icon by <a href="https://icons8.com/icon/77114/online-store" target="_blank" rel="noopener noreferrer">Icons8</a></p>
                <p>Product Photos on <a href="https://drawkit.com/" target="_blank" rel="noopener noreferrer">Draw Kit</a></p>
                        </div>
              </div>
          </div>

        </div>
           
    </footer>

    )
}

export default Footer