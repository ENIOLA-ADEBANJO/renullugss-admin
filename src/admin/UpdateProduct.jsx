import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { toast } from 'react-toastify';
import { db } from '../firebase.config';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import '../styles/update-product.css'

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState({});
  const [enterTitle, setEnterTitle] = useState('');
  const [enterShortDesc, setEnterShortDesc] = useState('');
  const [enterDescription, setEnterDescription] = useState('');
  const [enterCategory, setEnterCategory] = useState('');
  const [enterSection, setEnterSection] = useState('');
  const [enterPrice, setEnterPrice] = useState('');

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productRef = doc(db, 'products', id);
        const productSnapshot = await getDoc(productRef);
        if (productSnapshot.exists()) {
          setProductData(productSnapshot.data());
          setEnterTitle(productSnapshot.data().productName);
          setEnterShortDesc(productSnapshot.data().shortDesc);
          setEnterDescription(productSnapshot.data().description);
          setEnterCategory(productSnapshot.data().category);
          setEnterSection(productSnapshot.data().section);
          setEnterPrice(productSnapshot.data().price);
        } else {
          console.log('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProductData();
  }, [id]);

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, 'products', id), {
        productName: enterTitle,
        shortDesc: enterShortDesc,
        description: enterDescription,
        category: enterCategory,
        section: enterSection,
        price: enterPrice,
        // ... update other fields
      });
      toast.success('Product successfully updated!');
      navigate('/dashboard/all-products');
    } catch (err) {
      toast.error('Failed to update product.');
      console.error(err);
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg='12'>
            <h4 className = 'mb-5'>Edit Product</h4>
            <Form onSubmit={updateProduct}>
            <FormGroup className="form__group">
                <label>Title</label>
                <input
                  type="text"
                  value={enterTitle}
                  onChange={(e) => setEnterTitle(e.target.value)}
                />
              </FormGroup>
              <FormGroup className="form__group">
                <label>Short Description</label>
                <input
                  type="text"
                  value={enterShortDesc}
                  onChange={(e) => setEnterShortDesc(e.target.value)}
                />
              </FormGroup>
              <FormGroup className="form__group">
                <label>Description</label>
                <textarea
                  value={enterDescription}
                  onChange={(e) => setEnterDescription(e.target.value)}
                />
              </FormGroup>
              <FormGroup className="form__group">
                <label>Category</label>
                <input
                  type="text"
                  value={enterCategory}
                  onChange={(e) => setEnterCategory(e.target.value)}
                />
              </FormGroup>
              <FormGroup className="form__group">
                <label>Section</label>
                <input
                  type="text"
                  value={enterSection}
                  onChange={(e) => setEnterSection(e.target.value)}
                />
              </FormGroup>
              <FormGroup className="form__group">
                <label>Price</label>
                <input
                  type="text"
                  value={enterPrice}
                  onChange={(e) => setEnterPrice(e.target.value)}
                />
              </FormGroup>
              {/* ... add other form fields here */}
              <button className="buy__btn btn" type='submit'> Update Product</button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default UpdateProduct;
