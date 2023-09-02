import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import { collection, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import useGetData from '../custom-hooks/useGetData';
import { db, storage } from '../firebase.config';
import { uploadBytes, ref, getDownloadURL} from 'firebase/storage';

const AddCounter = () => {
  const [counterSection, setCounterSection] = useState({
    counterName: '',
    counterImageURL: '',
  });

  const [counterImage, setCounterImage] = useState(null);

  const { data: counterData } = useGetData('counterSection');

  useEffect(() => {
    if (counterData.length > 0) {
      setCounterSection(counterData[0]);
    }
  }, [counterData]);

  const handleAddCounter = async (e) => {
    e.preventDefault();

    try {
      // Upload the image to storage first and get the URL
      if (counterImage) {
        const storageRef = ref(storage, `counterImages/${counterImage.name}`);
        await uploadBytes(storageRef, counterImage);

        // Get the download URL for the uploaded image
        const downloadURL = await getDownloadURL(storageRef);

        // Set the image URL in the heroSection object
        const updatedCounter = {
          ...counterSection,
          counterImageURL: downloadURL,
        };

        // Update the heroSection in Firestore
        await updateCounterInFirestore(updatedCounter);

        toast.success('Hero section added successfully!');
      } else {
        toast.error('Please select an image.');
      }
    } catch (error) {
      toast.error('Failed to add hero section.');
      console.error(error);
    }
  };

  const updateCounterInFirestore = async (updatedCounter) => {
    try {
      if (counterData.length > 0) {
        // Update the existing hero section
        const docRef = doc(db, 'counterSection', counterData[0].id);
        await updateDoc(docRef, updatedCounter);
      } else {
        // Create a new hero section
        await addDoc(collection(db, 'counterSection'), updatedCounter);
      }

      setCounterSection(updatedCounter);
      console.log('Counter section updated successfully:', updatedCounter);
    } catch (error) {
      console.error('Error updating hero section:', error);
    }
  };

  const handleDeleteCounter = async () => {
    try {
      if (counterData.length > 0) {
        // Delete the existing hero section
        const docRef = doc(db, 'counterSection', counterData[0].id);
        await deleteDoc(docRef);
        
        // Reset the heroSection object
        const resetCounter = {
            counterName: '',
            counterImageURL: '',
        };
        
        setCounterSection(resetCounter);
        toast.success('Counter section deleted successfully!');
      } else {
        toast.error('Counter section does not exist.');
      }
    } catch (error) {
      toast.error('Failed to delete counter section.');
      console.error(error);
    }
  };

  return (
    <Container>
      <Row>
        <Col lg='8' className='mx-auto mt-4'>
          <h4 className='mb-4'>Add Counter Section</h4>
          <Form onSubmit={handleAddCounter}>
          <FormGroup>
              <Label for='counterName'>Counter Name</Label>
              <Input
                type='text'
                name='counterName'
                id='counterName'
                value={counterSection.counterName}
                onChange={(e) => setCounterSection({ ...counterSection, counterName: e.target.value })}
                placeholder='Counter Name'
              />
            </FormGroup>

            <FormGroup className='form__group'>
              <Label for='counterImage'>Counter Image</Label>
              <Input
                type='file'
                name='counterImage'
                id='counterImage'
                onChange={(e) => setCounterImage(e.target.files[0])}
              />
            </FormGroup>
            <Button color='primary' type='submit'>
              Add Counter
            </Button>
            <Button color='danger' onClick={handleDeleteCounter} className='ms-2'>
              Delete Counter
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddCounter;
