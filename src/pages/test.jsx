import React, { useEffect } from 'react';
import '../styles/cart.css';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import { Container, Row, Col } from 'reactstrap';
import { motion } from 'framer-motion';
import { cartActions } from '../redux/slices/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();

  // Load cart data from localStorage when the component is mounted
  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    const storedTotalAmount = localStorage.getItem('totalAmount');

    if (storedCartItems && storedTotalAmount) {
      dispatch(cartActions.setItems(JSON.parse(storedCartItems)));
      dispatch(cartActions.setTotalAmount(JSON.parse(storedTotalAmount)));
    }
  }, [dispatch]);

  // Save cart data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('totalAmount', JSON.stringify(totalAmount));
  }, [cartItems, totalAmount]);

  return (
    <Helmet title='Cart'>
      <CommonSection title='Shopping Cart' />
      <section>
        <Container>
          <Row>
            {/* ... your existing JSX */}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

// Rest of your component

export default Cart;
