
import React, {useState} from 'react';
import CommonSection from '../components/UI/CommonSection';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col} from 'reactstrap';

import '../styles/shop.css';

import products from '../assets/data/products'

import ProductsList from '../components/UI/ProductsList'
const Shop = () => {

  const [productsData, setProductsData] = useState(products)
  

  const handleFilter = (e) =>{
    const filterValue = e.target.value;
    if (filterValue === 'Door Handles'){
      const filteredProducts = products.filter(
        (item) => item.category === 'Door Handles'
        );
        setProductsData(filteredProducts);
    }

    if (filterValue === 'Door Hinges'){
      const filteredProducts = products.filter(
        (item) => item.category === 'Door Hinges'
        );
        setProductsData(filteredProducts);
    }

    if (filterValue === 'Door Hooks'){
      const filteredProducts = products.filter(
        (item) => item.category === 'Door Hooks'
        );
        setProductsData(filteredProducts);
    }

    if (filterValue === 'Door Knobs'){
      const filteredProducts = products.filter(
        (item) => item.category === 'Door Knobs'
        );
        setProductsData(filteredProducts);
    }

    if (filterValue === 'Cements'){
      const filteredProducts = products.filter(
        (item) => item.category === 'Cements'
        );
        setProductsData(filteredProducts);
    }

    if (filterValue === 'Toilet Seats'){
      const filteredProducts = products.filter(
        (item) => item.category === 'Toilet Seats'
        );
        setProductsData(filteredProducts);
    }

    if (filterValue === 'Toilet Seat Cover'){
      const filteredProducts = products.filter(
        (item) => item.category === 'Toilet Seat Cover'
        );
        setProductsData(filteredProducts);
    }

    if (filterValue === 'Urinal'){
      const filteredProducts = products.filter(
        (item) => item.category === 'Urinal'
        );
        setProductsData(filteredProducts);
    }


    if (filterValue === 'Toilet Taps'){
      const filteredProducts = products.filter(
        (item) => item.category === 'Toilet Taps'
        );
        setProductsData(filteredProducts);
    }

    if (filterValue === 'Toilet Basins'){
      const filteredProducts = products.filter(
        (item) => item.category === 'Toilet Basins'
        );
        setProductsData(filteredProducts);
    }

    

    if (filterValue === 'BathTubs'){
      const filteredProducts = products.filter(
        (item) => item.category === 'BathTubs'
        );
        setProductsData(filteredProducts);
    }

    if (filterValue === 'Cubicle'){
      const filteredProducts = products.filter(
        (item) => item.category === 'Cubicle'
        );
        setProductsData(filteredProducts);
    }

    if (filterValue === 'Keys'){
      const filteredProducts = products.filter(
        (item) => item.category === 'Keys'
        );
        setProductsData(filteredProducts);
    }

    if (filterValue === 'Shovel'){
      const filteredProducts = products.filter(
        (item) => item.category === 'Shovel'
        );
        setProductsData(filteredProducts);
    }
  };

  const handleSearch = e=> {
    const searchTerm = e.target.value

    const searchedProducts = products.filter(item=> item.category.
      toLowerCase().includes(searchTerm.toLowerCase()))

      setProductsData(searchedProducts)
  }
  return <Helmet title='Shop'>
    <CommonSection title= "Products"/>

    <section>
      <Container>
        <Row>
          <Col lg='3' md='3'> 
            <div className="filter__widget">
              <select onChange={handleFilter}>
                <option> Filter By Category</option>
                <option value="Cements">Cement</option>
                <option value="Door Handles">Door Handles</option>
                <option value="Door Hinges">Door Hinges</option>
                <option value="Door Hooks">Door Hooks</option>
                <option value="Door Knobs">Door Knobs</option>
                <option value="Toilet Seats">Toilet Seats</option>
                <option value="Toilet Seat Cover">Toilet Seat Cover</option>
                <option value="Urinal">Urinal</option>
                <option value="Toilet Taps">Toilet Taps</option>
                <option value="Toilet Basins">Toilet Basins</option>
                <option value="BathTubs">BathTubs</option>
                <option value="Cubicle">Cubicle</option>
                <option value="Keys">Keys</option>
                <option value="Shovel">Shovel</option>
              </select>
            </div>
          </Col>
          {/* <Col lg='3' md='3'> 
          <div className="filter__widget">
            <select>
                  <option> Sort By </option>
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
            </div>
          </Col> */}
          <Col lg='8' md='6'>
            <div className="search__box">
              <input 
                type="text" 
                placeholder="Search............" 
                onChange={handleSearch} 
              />
              <span><i class="ri-search-line"></i></span>
            </div>   
          </Col>
        </Row>
      </Container>
    </section>

    <section className='pt-0'>
      <Container>
        <Row>
          {
            productsData.length === 0? <h1 className='text-center fs-4'>No products are found!</h1>
            : <ProductsList data={productsData} />
          }
        </Row>
      </Container>
    </section>
  </Helmet>
}

export default Shop
