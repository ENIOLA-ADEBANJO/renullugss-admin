import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap'
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection'
import { useSelector} from 'react-redux'
import '../styles/checkout.css'
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';

const Checkout = () => {
  const totalQty = useSelector(state => state.cart.totalQuantity);
  const totalAmount = useSelector(state => state.cart.totalAmount);

  const [billingInfo, setBillingInfo] = useState({
    name: '',
    email: '',
    phone_number: '',
    address: '',
    city: '',
    country: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo({
      ...billingInfo,
      [name]: value,
    });
  };

  const config = {
    public_key: 'FLWPUBK-406b3963f2a2bfe8d4105fbcd849438a-X',
    tx_ref: Date.now(),
    amount: totalAmount,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customizations: {
      title: 'RENLLUGS BUILDING RESOURCES',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const fwConfig = {
    ...config,
    text: 'Pay with Flutterwave!',
    customer: {
      email: billingInfo.email,
      phone_number: billingInfo.phone_number,
      name: billingInfo.name,
      address: billingInfo.address,
      city: billingInfo.city,
      country: billingInfo.country
    },
    callback: (response) => {
      if (response.status !== "completed") {
        console.log("Failed Transaction");
      } else {
        console.log("Success");
      }
      closePaymentModal(); // this will close the modal programmatically
    },
    onClose: () => {
      console.log("User closed it himself");
    },
  };
  
  return (
    <Helmet title='Checkout'>
      <CommonSection title='Checkout' />
      <section>
        <Container>
          <Row>
            <Col lg='8'>
              <h6 className='mb-4 fw-bold'>(Note: Fill the Billing Info to be able to Proceed to Pay)</h6>
              <Form className='billing__form'>
                <FormGroup className="form__group">
                  <input
                    type="text"
                    name="name"
                    placeholder='Enter your name'
                    value={billingInfo.name}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="email"
                    name="email"
                    placeholder='Enter your email'
                    value={billingInfo.email}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="number"
                    name="phone_number"
                    placeholder='Phone number'
                    value={billingInfo.phone_number}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="text"
                    name="address"
                    placeholder='Delivery Address'
                    value={billingInfo.address}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="text"
                    name="city"
                    placeholder='City'
                    value={billingInfo.city}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="text"
                    name="country"
                    placeholder='Country'
                    value={billingInfo.country}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
              </Form>
            </Col>
            <Col lg='4'>
              <div className="checkout__cart">
                <h6>
                  Total Qty: <span>{totalQty} items</span>
                </h6>
                <h6>
                  Subtotal: <span>₦{totalAmount}</span>
                </h6>
                <h6>  
                  Delivery Fees: <span>₦0</span>
                </h6>
                <h4>
                  Total Cost: <span>₦{totalAmount}</span>
                </h4>
                <button className='buy__btn auth__btn w-100 '>
                  <FlutterWaveButton {...fwConfig} />
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;
