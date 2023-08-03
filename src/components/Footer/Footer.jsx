
import React from 'react'
import './footer.css'

import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap'
import { Link } from 'react-router-dom'

const Footer = () => {

  const year = new Date().getFullYear()
  return <footer className="footer">
    <Container>
      <Row>
        <Col lg= '4' className='mb-4' md='6'> 
        <div className="logo">
            <div>
              <h1 className='text-white'>Renllugs Building Resources</h1>
            </div>
          </div>
          <p className="footer__text mt-4">
              Welcome to Renllugs Building Resources,
              <br/>
              We Provide Quality, Durable and Affordable Building Resources and Deliver anywhere in Nigeria
            </p>
        </Col>
        <Col lg= '3' md = '3' className='mb-4'>
          <div className="footer__quick-links">
            <h4 className="quick__links-title"> Top Categories</h4>
            <ListGroup>
              <ListGroupItem className='ps-0 border-0'>
                <Link to = '/shop'> Cements</Link>
              </ListGroupItem >
              <ListGroupItem className='ps-0 border-0'>
                <Link to = '/shop'> Door Materials</Link>
              </ListGroupItem>
              <ListGroupItem className='ps-0 border-0'>
                <Link to = '/shop'> Toilet Materials</Link>
              </ListGroupItem>
              <ListGroupItem className='ps-0 border-0'>
                <Link to = '/shop'> Housing Materials</Link>
              </ListGroupItem>
            </ListGroup>
          </div>
        </Col>

        <Col lg= '2' md= '3'className='mb-4'>
          <div className="footer__quick-links">
            <h4 className="quick__links-title"> Useful Links</h4>
            <ListGroup>
              <ListGroupItem className='ps-0 border-0'>
                <Link to = '/shop'> Shop</Link>
              </ListGroupItem >
              <ListGroupItem className='ps-0 border-0'>
                <Link to = '/cart'> Cart</Link>
              </ListGroupItem>
              <ListGroupItem className='ps-0 border-0'>
                <Link to = '/login'> Login</Link>
              </ListGroupItem>
              <ListGroupItem className='ps-0 border-0'>
                <Link to = '#'> Privacy Policy</Link>
              </ListGroupItem>
            </ListGroup>
          </div>
        </Col>

        <Col lg= '3' md='4'>
          <div className="footer__quick-links">
            <h4 className="quick__links-title"> Contact</h4>
            <ListGroup className='footer__contact'>
              <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
                <span><i class="ri-map-pin-line"></i></span>
                <p> Plot 284, Gbagada Express Way. Charley Boy Bus stop. Lagos, Nigeria</p>
              </ListGroupItem >
              <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
                <span><i class="ri-phone-line"></i></span>
                <p> +2349090354896</p>
              </ListGroupItem>
              <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>     
                <span><i class="ri-mail-line"></i></span>
                <p>oladimejianjola2001@gmail.com</p>
              </ListGroupItem>
            </ListGroup>
          </div>
        </Col>

        <Col lg='12'>
          <p className="footer__copyright">
            Copyright {year} developed by MAJOR-X TECHNOLOGIES. All rights reserved.
          </p>
        </Col>
      </Row>
    </Container>
  </footer>
}

export default Footer