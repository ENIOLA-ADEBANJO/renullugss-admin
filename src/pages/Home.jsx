import React, { useState, useEffect } from 'react';
import Helmet from '../components/Helmet/Helmet';
import '../styles/home.css';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Services from '../services/Services';
import ProductsList from '../components/UI/ProductsList';
import Clock from '../components/UI/Clock';
import useGetData from '../custom-hooks/useGetData';

const Home = () => {
  const { data: products, loading } = useGetData('products');
  const { data: sectionTitlesData } = useGetData('sectionTitles');
  const { data: heroSectionData } = useGetData('heroSection');
  const { data: counterData } = useGetData('counterSection');

  const [sectionTitles, setSectionTitles] = useState({
    firstSection: '',
    secondSection: '',
    thirdSection: '',
    fourthSection: '',
    fifthSection: '',
  });

  useEffect(() => {
    if (sectionTitlesData.length > 0) {
      setSectionTitles(sectionTitlesData[0]);
    }
  }, [sectionTitlesData]);

  const [heroSection, setHeroSection] = useState({
    heroTitle: '',
    heroSubtitle: '',
    heroSubtitle2: '',
    heroImageURL: '',
  });

  useEffect(() => {
    if (heroSectionData.length > 0) {
      setHeroSection(heroSectionData[0]);
    }
  }, [heroSectionData]);

  const [counterSection, setCounterSection] = useState({
    counterName: '',
    counterImageURL: '',
  });

  useEffect(() => {
    if (counterData.length > 0) {
      setCounterSection(counterData[0]);
    }
  }, [counterData]);

  return (
    <Helmet title={'Home'}>
      <section className='hero__section'>
        <Container>
          <Row>
            <Col lg='6' md='6'>
              <div className='hero__content'>
                <h2 className='hero__subtitle'>{heroSection.heroTitle}</h2>
                <p>{heroSection.heroSubtitle}</p>
                <p>{heroSection.heroSubtitle2}</p>
                <motion.button whileTap={{ scale: 1.2 }} className='buy__btn'>
                  <Link to='/shop'>SHOP NOW</Link>
                </motion.button>
              </div>
            </Col>
            <Col lg='6' md='6'>
              <div className='hero__img'>
                {heroSection.heroImageURL && (
                  <img src={heroSection.heroImageURL} alt='' />
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Services />

      <section className='first__section'>
        <Container>
          <Row>
            <Col lg='12' className='text-center mb-5'>
              <h2 className='section__title'>{sectionTitles.firstSection}</h2>
            </Col>
            {loading ? (
              <h5 className='fw-bold'>Loading....</h5>
            ) : (
              <ProductsList data={products.filter((item) => item.section === 'first__section')} />
            )}
          </Row>
        </Container>
      </section>

      <section className='second__section'>
        <Container>
          <Row>
            <Col lg='12' className='text-center mb-5'>
              <h2 className='section__title'>{sectionTitles.secondSection}</h2>
            </Col>
            {loading ? (
              <h5 className='fw-bold'>Loading....</h5>
            ) : (
              <ProductsList data={products.filter((item) => item.section === 'second__section')} />
            )}
          </Row>
        </Container>
      </section>

      <section className="timer__count mb-5">
        <Container>
          <Row>
            <Col lg='6' md='12' className='count__down-col'>
              <div className="clock__top-content">
                <h4 className='text-white fs-6 mb-2'>Limited Offers</h4>
                <h3 className='text-white fs-5 mb-3'>{counterSection.counterName}</h3>
              </div>
              <Clock />
              <motion.button whileTap={{scale:1.2}} className="buy__btn store__btn">
                <Link to = "/shop">Visit Store</Link>
              </motion.button>
            </Col>
            <Col lg='4' md='12' className='text-end counter__img'>
              {counterSection.counterImageURL && (
                  <img src={counterSection.counterImageURL} alt='' />
                )}
            </Col>
          </Row>
        </Container>
      </section>
      
      <section className='second__section'>
        <Container>
          <Row>
            <Col lg='12' className='text-center mb-5'>
              <h2 className='section__title'>{sectionTitles.thirdSection}</h2>
            </Col>
            {loading ? (
              <h5 className='fw-bold'>Loading....</h5>
            ) : (
              <ProductsList data={products.filter((item) => item.section === 'third__section')} />
            )}
          </Row>
        </Container>
      </section>

      <section className='second__section'>
        <Container>
          <Row>
            <Col lg='12' className='text-center mb-5'>
              <h2 className='section__title'>{sectionTitles.fourthSection}</h2>
            </Col>
            {loading ? (
              <h5 className='fw-bold'>Loading....</h5>
            ) : (
              <ProductsList data={products.filter((item) => item.section === 'fourth__section')} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;
