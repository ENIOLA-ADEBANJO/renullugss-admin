
import '../styles/dashboard.css'
import React from 'react'
import {Container, Row, Col} from "reactstrap"
import { Link } from 'react-router-dom';
import useGetData from '../custom-hooks/useGetData';

const Dashboard = () => {

  const {data: products} = useGetData('products')
  const {data: users} = useGetData('users')

  return <section>
    <Container>
      <Row>
        
        <Col className="lg-3">
        <Link to = '/dashboard/add-section'>
          <div className="users__box">
            <h5>Add Home Page</h5>
            <span>Section</span>
          </div>
        </Link>
        </Col>

        <Col className="lg-3">
        <Link to = '/dashboard/add-hero'>
          <div className="users__box">
            <h5>Add Home Page</h5>
            <span>Hero</span>
          </div>
        </Link>
        </Col>

        <Col className="lg-3">
        <Link to = '/dashboard/add-counter'>
          <div className="users__box">
            <h5>Add Home Page</h5>
            <span>Counter</span>
          </div>
        </Link>
        </Col>

        <Col className="lg-3">
          <div className="products__box">
            <h5>Total Products</h5>
            <span>{products.length}</span>
          </div>
        </Col>
        <Col className="lg-3">
          <div className="users__box">
            <h5>Total Users</h5>
            <span>{users.length}</span>
          </div>
        </Col>

      </Row>

    </Container>
  </section>
};

export default Dashboard