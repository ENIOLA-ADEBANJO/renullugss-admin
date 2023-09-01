import React, { useState, useEffect } from 'react';
import CommonSection from '../components/UI/CommonSection';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col } from 'reactstrap';
import useGetData from '../custom-hooks/useGetData'; // Import the custom hook
import '../styles/shop.css';
import ProductCard from '../components/UI/ProductCard';


const Shop = () => {
  const { data: productsData, loading } = useGetData('products');
  const [filteredProductsData, setFilteredProductsData] = useState([]);
  const [categories, setCategories] = useState([]);
  // const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    // Extract categories from productsData
    const extractedCategories = [...new Set(productsData.map(item => item.category))];
    setCategories(extractedCategories);
  }, [productsData]);

  const handleFilter = (e) => {
    const filterValue = e.target.value;

    if (filterValue === 'All') {
      setFilteredProductsData(productsData);
    } else {
      const filteredProducts = productsData.filter(
        (item) => item.category === filterValue
      );
      setFilteredProductsData(filteredProducts);
    }
  };

  const handleSort = (e) => {
    const sortValue = e.target.value;

    let sortedProducts = [...filteredProductsData];
    if (sortValue === 'lowest') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortValue === 'highest') {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProductsData(sortedProducts);
  };

  const handleSearch = e => {
    const searchTerm = e.target.value.toLowerCase();

    if (searchTerm === '') {
      setFilteredProductsData([]);
    } else {
      const searchedProducts = productsData.filter(item =>
        item.category.toLowerCase().includes(searchTerm)
      );

      setFilteredProductsData(searchedProducts);
    }
  };

  return (
    <Helmet title='Shop'>
      <CommonSection title="Products"/>

      <section>
        <Container>
          <Row>
            <Col lg='3' md='3'>
              <div className="filter__widget">
                <select onChange={handleFilter}>
                  <option value="All"> Filter By Category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </Col>
            <Col lg='3' md='3'>
              <div className="filter__widget">
                <select onChange={handleSort}>
                  <option> Sort By </option>
                  <option value="lowest">Lowest Price</option>
                  <option value="highest">Highest Price</option>
                </select>
              </div>
            </Col>
            <Col lg='6' md='6'>
              <div className="search__box">
                <input
                  type="text"
                  placeholder="Search............"
                  onChange={handleSearch}
                />
                <span><i className="ri-search-line"></i></span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className='pt-0'>
        <Container>
        <Row>
            {loading ? (
              <h1 className='text-center fs-4'>Loading...</h1>
            ) : filteredProductsData.length === 0 ? (
              <h1 className='text-center fs-4'>No products are found!</h1>
            ) : (
              <Row>
                {filteredProductsData.map((item) => (
                  <ProductCard item={item} key={item.id} />
                ))}
              </Row>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}

export default Shop;
