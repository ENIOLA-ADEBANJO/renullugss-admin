import React, {useState, useEffect} from 'react'
import { Container, Row, Col } from 'reactstrap';
import { useParams } from 'react-router-dom';
import useGetData from '../custom-hooks/useGetData';
import ProductsList from '../components/UI/ProductsList'; 
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/UI/CommonSection';
import { useDispatch } from 'react-redux';
import { cartActions } from '../redux/slices/cartSlice';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import '../styles/product-details.css';

const ProductDetails = () => {
  const { id } = useParams();
  const { data: productsData } = useGetData('products');
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const [tab, setTab] = useState('desc');

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        image: imgUrl,
        productName,
        price,
      })
    );
    toast.success('Product added successfully');
  };

  useEffect(() => {
    const selectedProduct = productsData.find(item => item.id === id);
    setProduct(selectedProduct);
  }, [id, productsData]);

  if (!product) {
    return <h1>Loading...</h1>;
  }

  const {
    imgUrl,
    productName,
    price,
    description,
    shortDesc,
    category,
  } = product;

  // Calculate related products based on the current product's category
  const relatedProducts = productsData.filter(
    item => item.category === category && item.id !== id
  );

  return (
<Helmet title={productName}>
<CommonSection title={productName}/>

  <section className='pt-0'>
    <Container>
      <Row>
        <Col lg='6'>
          <img src= {imgUrl} alt='' />
        </Col>

        <Col lg='6'>
          <div className="product__details">
            <h2>{productName}</h2>
            <div className="product__rating d-flex align-items-center gap-5 mb-3">
              <div> 
                <span>
                  <i class="ri-star-s-fill"></i>
                </span>
                <span>
                  <i class="ri-star-s-fill"></i>
                </span>
                <span>
                  <i class="ri-star-s-fill"></i>
                </span>
                <span>
                  <i class="ri-star-s-fill"></i>
                </span>
                <span>
                  <i class="ri-star-half-line"></i>
                </span>
              </div>
             <p> (<span> 4.5 </span> ratings)</p>
            </div>

            <div className='d-flex align-items-center gap-5'>
              <span className='product__price'> ₦{price}</span>
              <span>Category: {category.toUpperCase()}</span>
            </div>
            <p className='mt-3'>{shortDesc}</p>

            <motion.button whileTap={{scale:1.2}} 
            className="buy__btn" onClick={addToCart}>
              Add to Cart
            </motion.button>
          </div>
        </Col>
        </Row>
      </Container>
      </section>

      <section>
    <Container>
      <Row>
        <Col lg= '12'>
          <div className="tab__wrapper d-flex align-items-center gap-5">
            <h6 className={`${tab === 'desc' ? 'active__tab' : ''}`}
            onClick={() => setTab('desc')}
            >
              Decription
            </h6>
            <h6 className={`${tab === 'rev' ? 'active__tab' : ''}`}
            onClick={() => setTab('rev')}
            >
            </h6>
          </div>
          {tab==='desc' ? (
            <div className="tab__content mt-5">
              <p>{description}</p>
            </div> 
          ): (
            <div className='product__review mt-5'> 
            {/* ... Add review form */}
          </div>
        )}
      </Col>

        <Col lg='12' className='mt-5'>
          <h2 className="related__title">You might also like</h2>
        </Col>
        <ProductsList data={relatedProducts}/>
      </Row>
    </Container>
  </section>

    </Helmet>
  );
};

export default ProductDetails;
