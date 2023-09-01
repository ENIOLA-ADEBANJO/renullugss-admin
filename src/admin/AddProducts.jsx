import React, {useState} from 'react'
import { Container, Row, Col, Form, FormGroup } from 'reactstrap'
import {toast} from 'react-toastify'
import {db, storage} from '../firebase.config';
import { uploadBytesResumable, ref ,getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import '../styles/add-product.css';

const AddProducts = () => {
  const [enterTitle, setEnterTitle] = useState('')
  const [enterShortDesc, setEnterShortDesc] = useState('')
  const [enterDescription, setEnterDescription] = useState('')
  const [enterCategory, setEnterCategory] = useState('')
  const [enterSection, setEnterSection] = useState('')
  const [enterPrice, setEnterPrice] = useState('')
  const [enterProductImg, setEnterProductImg] = useState(null);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()


  const addProduct = async (e) => {
    e.preventDefault();
  
    try {
      setLoading(true);
      
      // Upload image to Firebase Storage
      const storageRef = ref(storage, `productImages/${Date.now() + enterProductImg.name}`);
      const uploadTask = uploadBytesResumable(storageRef, enterProductImg);
  
      uploadTask.on(
        'state_changed',
        null,
        (error) => {
          setLoading(false);
          toast.error('Image upload failed!');
          console.error(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
  
            await addDoc(collection(db, 'products'), {
              productName: enterTitle,
              shortDesc: enterShortDesc,
              description: enterDescription,
              category: enterCategory,
              section: enterSection,
              price: enterPrice,
              imgUrl: downloadURL,

            });
    
              setLoading(false);
              toast.success('Product successfully added!');
              navigate('/dashboard/add-products');
            } catch (err) {
              setLoading(false);
              toast.error('Failed to add product to Firestore.');
              console.error(err);
            }
          }
        );
      } catch (err) {
        setLoading(false);
        toast.error('Failed to upload image and add product.');
        console.error(err);
      }
    };

  return(
  <section>
  <Container>
    <Row>
      <Col lg='12'>
        {loading ? ( 
          <h4 className='py-5'> Loading.....</h4> 
            ):( 
            <>
            <h4 className='mb-5'> Add Product </h4>
            <Form onSubmit={addProduct}>
          <FormGroup className="form__group">
            <span> Product title </span>
            <input type="text"  placeholder='Double sofa' value={enterTitle} onChange={e=> setEnterTitle(e.target.value)} />
          </FormGroup>
          <FormGroup className="form__group">
            <span> Short Description </span>
            <input type="text"  placeholder='lorem...' value={enterShortDesc} onChange={e=> setEnterShortDesc(e.target.value)} />
          </FormGroup>
          <FormGroup className="form__group">
            <span> Description </span>
            <input type="text"  placeholder='lorem...' value={enterDescription} onChange={e=> setEnterDescription(e.target.value)} />
          </FormGroup>
        <div className='d-flex align-items-center justify-content-between gap-5'>
          <FormGroup className="form__group w-50">
            <span> Price </span>
            <input type="text"  placeholder='₦0.00' value={enterPrice} onChange={e=> setEnterPrice(e.target.value)} />
          </FormGroup>

  
          <FormGroup className="form__group w-50">
            <span> Category </span>
            <select className='w-100 p-2' value={enterCategory} onChange={e=> setEnterCategory(e.target.value)} 
            >
              <option>Select Category</option>
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
          </FormGroup>
          <FormGroup className="form__group w-50">
            <span> Section </span>
            <select className='w-100 p-2' value={enterSection} onChange={e=> setEnterSection(e.target.value)} 
            >
              <option>Select Section</option>
              <option value="first__section">First Section</option>
              <option value="second__section">Second Section</option>
              <option value="third__section">Third Section</option>
              <option value="fourth__section">Fourth Section</option>
              <option value="fifth__section">Fifth Section</option>
              <option value="counter__section">Counter Section</option>
              <option value="no__section">No Section</option>
            </select>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="form__group">
            <span> Product Image </span>
            <input type="file" onChange={e=> setEnterProductImg(e.target.files[0])}required />
          </FormGroup>
        </div>
          <button className="buy__btn btn" type='submit'> Add Product</button>
        </Form>
            </>
        )}
      </Col>
    </Row>
  </Container>
</section>
  );
};

export default AddProducts