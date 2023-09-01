import React, {useState, useEffect} from 'react';
import Helmet from '../components/Helmet/Helmet';
import '../styles/home.css'
import {Container, Row, Col} from "reactstrap";
import heroImg from '../assets/images/hero-img.png';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Services from '../services/Services';
import ProductsList from '../components/UI/ProductsList';
import Clock from '../components/UI/Clock';
import useGetData from '../custom-hooks/useGetData';


const Home = () => {
  const {data: products, loading} = useGetData('products')
  const [firstSection, setFirstSection] = useState([]);
  const [secondSection, setSecondSection] = useState([]);
  const [thirdSection, setThirdSection] = useState([]);
  const [fourthSection, setFourthSection] = useState([]);
  const [fifthSection, seFifthSection] = useState([]);
  const [counterSection, setCounterSection] = useState([]);
  // const year = new Date().getFullYear();

  useEffect(() => {
    const filteredFirstSection = products.filter(
      (item) => item.section === 'first__section'
    );
    const filteredSecondSection = products.filter(
      (item) => item.section === 'second__section'
    );

    const filteredThirdSection = products.filter(
      (item) => item.section === 'third__section'
    );

    const filteredFourthSection = products.filter(
      (item) => item.section === 'fouth__section'
    );

    const filteredFifthSection = products.filter(
      (item) => item.section === 'fifth__section'
    );

    const filteredCounterSection= products.filter(
      (item) => item.section === 'counter__section'
    );

    setFirstSection(filteredFirstSection);
    setSecondSection(filteredSecondSection);
    setThirdSection(filteredThirdSection);
    setFourthSection(filteredFourthSection);
    seFifthSection(filteredFifthSection)
    setCounterSection(filteredCounterSection)
  }, [products]);

  return (
    <Helmet title={'Home'}>
      <section className='hero__section'>
        <Container>
          <Row>
            <Col lg='6' md='6'>
              <div className="hero__content">
                <h2 className="hero__subtitle">
                  Renllugs Building Resources
                </h2>
                <p> No. 1 Online Shopping Platform for Building Resources in Nigeria</p>
                <p>Experience the pleasure of getting affordable and quality building resources on our platform with fast delivery from the comfort of your home </p>
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
      <section className="first__section">
        <Container>
          <Row>
            <Col lg='12' className='text-center mb-5'>
              <h2 className='section__title'>Toilet Seats</h2>
            </Col>
            {
              loading ? <h5 className='fw-bold'>Loading....</h5>:
              <ProductsList data={firstSection}/>
            }

          </Row>
        </Container>
      </section>

      <section className="second__section">
        <Container>
          <Row>
              <Col lg='12' className='text-center mb-5'>
                <h2 className='section__title'>Toilet Taps</h2>
              </Col>
              {
              loading ? <h5 className='fw-bold'>Loading....</h5>:
              <ProductsList data={secondSection}/>
              }

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
            <ProductsList data={counterSection}/>
            </Col>
          </Row>
        </Container>
      </section>
      
      <section className="third__section">
      <Container>
          <Row>
              <Col lg='12' className='text-center mb-5'>
                <h2 className='section__title'>Door Hooks</h2>
              </Col>
              {
              loading ? <h5 className='fw-bold'>Loading....</h5>:
              <ProductsList data={thirdSection}/>
              }
                            {
              loading ? <h5 className='fw-bold'>Loading....</h5>:
              <ProductsList data={fourthSection}/>
              }



            </Row>
        </Container> 
      </section>

      <section className="fifth__section">
      <Container>
          <Row>
              <Col lg='12' className='text-center mb-5'>
                <h2 className='section__title'>Cemen</h2>
              </Col>
              {
              loading ? <h5 className='fw-bold'>Loading....</h5>:
              <ProductsList data={fifthSection}/>
              }


            </Row>
        </Container> 
      </section>
    </Helmet>
  );
}

export default Home
