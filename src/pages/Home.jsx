import React, {useState, useEffect} from 'react';
import Helmet from '../components/Helmet/Helmet';

import '../styles/home.css'

import {Container, Row, Col} from "reactstrap";
import heroImg from '../assets/images/hero-img.png';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import Services from '../services/Services';
import products from '../assets/data/products';
import ProductsList from '../components/UI/ProductsList';
import counterImg from '../assets/images/cements/Cement.jpeg';
import img100 from "../assets/images/cubicle/Quadrant Shower Cubicle.jpeg"

import Clock from '../components/UI/Clock';
const Home = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);
  const [mobileProducts, setMobileProducts] = useState([]);
  const [wirelessProducts, setWirelessProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);

  const year = new Date().getFullYear();

  useEffect(() => {
    const filteredTrendingProducts = products.filter(
      (item) => item.category === 'Toilet Seats'
    );
    const filteredBestSalesProducts = products.filter(
      (item) => item.category === 'Toilet Taps'
    );

    const filteredMobileProducts = products.filter(
      (item) => item.category === 'Door Hooks'
    );

    const filteredWirelessProducts = products.filter(
      (item) => item.category === 'wireless'
    );

    const filteredPopularProducts = products.filter(
      (item) => item.category === 'Cements'
    );

    setTrendingProducts(filteredTrendingProducts);
    setBestSalesProducts(filteredBestSalesProducts);
    setMobileProducts(filteredMobileProducts);
    setWirelessProducts(filteredWirelessProducts);
    setPopularProducts(filteredPopularProducts)
  }, []);

  return (
    <Helmet title={'Home'}>
      <section className='hero__section'>
        <Container>
          <Row>
            <Col lg='6' md='6'>
              <div className="hero__content">
                <h5 className="hero__subtitle">
                  Renllugs Building Resources
                </h5>
                <br/>
                <h3> No. 1 Online Shopping Platform for Building Resources in Nigeria</h3>
                <br/>
                <p>Experience the pleasure of getting affordable and quality bulding resources on our platform with fast delivery from the comfort your home </p>
                  <motion.button whileTap={{scale: 1.2}} className='buy__btn'> <Link to = '/shop'>SHOP NOW</Link></motion.button>
              </div>

            </Col>
            <Col lg='6' md='6'>
              <div className='hero__img'>
                <img src={heroImg} alt='' />
              </div>
            </Col>
          </Row>
        </Container>

      </section>

      <Services />
      <section className="trending__products">
        <Container>
          <Row>
            <Col lg='12' className='text-center mb-5'>
              <h2 className='section__title'>Toilet Seats</h2>
            </Col>
            <ProductsList data={trendingProducts}/>
          </Row>
        </Container>
      </section>

      <section className="best__sales">
        <Container>
          <Row>
              <Col lg='12' className='text-center mb-5'>
                <h2 className='section__title'>Toilet Taps</h2>
              </Col>

              <ProductsList data={bestSalesProducts}/>
            </Row>
        </Container> 
      </section>

      <section className="timer__count mb-5">
        <Container>
          <Row>
          <Col lg='6' md='12' className='count__down-col'>

            <div className="clock__top-content">
              <h4 className='text-white fs-6 mb-2'>Limited Offers</h4>
              <h3 className='text-white fs-5 mb-3'>Quadrant Shower Cubicle</h3>
            </div>
            <Clock />

            <motion.button whileTap={{scale:1.2}} className="buy__btn store__btn">
              <Link to = "/shop">Visit Store</Link>
            </motion.button>
          </Col>


            <Col lg='4' md='12' className='text-end counter__img'>
              <img src={img100} alt='' />
            </Col>
          </Row>
        </Container>
      </section>
      
      <section className="new__arival">
      <Container>
          <Row>
              <Col lg='12' className='text-center mb-5'>
                <h2 className='section__title'>Door Hooks</h2>
              </Col>

              <ProductsList data={mobileProducts}/>
              <ProductsList data={wirelessProducts}/>
            </Row>
        </Container> 
      </section>

      <section className="popular__category">
      <Container>
          <Row>
              <Col lg='12' className='text-center mb-5'>
                <h2 className='section__title'>Cements</h2>
              </Col>

              <ProductsList data={popularProducts}/>
            </Row>
        </Container> 
      </section>
    </Helmet>
  );
}

export default Home
