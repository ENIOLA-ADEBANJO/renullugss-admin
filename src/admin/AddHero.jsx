import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import { collection, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import useGetData from '../custom-hooks/useGetData';
import { db, storage } from '../firebase.config';
import { uploadBytes, ref, getDownloadURL} from 'firebase/storage';

const AddHero = () => {
  const [heroSection, setHeroSection] = useState({
    heroTitle: '',
    heroSubtitle: '',
    heroSubtitle2: '',
    heroImageURL: '',
  });

  const [heroImage, setHeroImage] = useState(null);

  const { data: heroSectionData } = useGetData('heroSection');

  useEffect(() => {
    if (heroSectionData.length > 0) {
      setHeroSection(heroSectionData[0]);
    }
  }, [heroSectionData]);

  const handleAddHeroSection = async (e) => {
    e.preventDefault();

    try {
      // Upload the image to storage first and get the URL
      if (heroImage) {
        const storageRef = ref(storage, `heroImages/${heroImage.name}`);
        await uploadBytes(storageRef, heroImage);

        // Get the download URL for the uploaded image
        const downloadURL = await getDownloadURL(storageRef);

        // Set the image URL in the heroSection object
        const updatedHeroSection = {
          ...heroSection,
          heroImageURL: downloadURL,
        };

        // Update the heroSection in Firestore
        await updateHeroSectionInFirestore(updatedHeroSection);

        toast.success('Hero section added successfully!');
      } else {
        toast.error('Please select an image.');
      }
    } catch (error) {
      toast.error('Failed to add hero section.');
      console.error(error);
    }
  };

  const updateHeroSectionInFirestore = async (updatedHeroSection) => {
    try {
      if (heroSectionData.length > 0) {
        // Update the existing hero section
        const docRef = doc(db, 'heroSection', heroSectionData[0].id);
        await updateDoc(docRef, updatedHeroSection);
      } else {
        // Create a new hero section
        await addDoc(collection(db, 'heroSection'), updatedHeroSection);
      }

      setHeroSection(updatedHeroSection);
      console.log('Hero section updated successfully:', updatedHeroSection);
    } catch (error) {
      console.error('Error updating hero section:', error);
    }
  };

  const handleDeleteHeroSection = async () => {
    try {
      if (heroSectionData.length > 0) {
        // Delete the existing hero section
        const docRef = doc(db, 'heroSection', heroSectionData[0].id);
        await deleteDoc(docRef);
        
        // Reset the heroSection object
        const resetHeroSection = {
          heroTitle: '',
          heroSubtitle: '',
          heroSubtitle2: '',
          heroImageURL: '',
        };
        
        setHeroSection(resetHeroSection);
        toast.success('Hero section deleted successfully!');
      } else {
        toast.error('Hero section does not exist.');
      }
    } catch (error) {
      toast.error('Failed to delete hero section.');
      console.error(error);
    }
  };

  return (
    <Container>
      <Row>
        <Col lg='8' className='mx-auto mt-4'>
          <h4 className='mb-4'>Add Hero Section</h4>
          <Form onSubmit={handleAddHeroSection}>
          <FormGroup>
              <Label for='heroTitle'>Hero Title</Label>
              <Input
                type='text'
                name='heroTitle'
                id='heroTitle'
                value={heroSection.heroTitle}
                onChange={(e) => setHeroSection({ ...heroSection, heroTitle: e.target.value })}
                placeholder='Enter Hero Title'
              />
            </FormGroup>
            <FormGroup>
              <Label for='heroSubtitle'>Hero Subtitle</Label>
              <Input
                type='text'
                name='heroSubtitle'
                id='heroSubtitle'
                value={heroSection.heroSubtitle}
                onChange={(e) =>
                  setHeroSection({ ...heroSection, heroSubtitle: e.target.value })
                }
                placeholder='Enter Hero Subtitle'
              />
            </FormGroup>
            <FormGroup>
              <Label for='heroSubtitle2'>Hero Subtitle 2</Label>
              <Input
                type='text'
                name='heroSubtitle2'
                id='heroSubtitle2'
                value={heroSection.heroSubtitle2}
                onChange={(e) =>
                  setHeroSection({ ...heroSection, heroSubtitle2: e.target.value })
                }
                placeholder='Enter Hero Subtitle 2'
              />
            </FormGroup>
            <FormGroup className='form__group'>
              <Label for='heroImage'>Hero Image</Label>
              <Input
                type='file'
                name='heroImage'
                id='heroImage'
                onChange={(e) => setHeroImage(e.target.files[0])}
              />
            </FormGroup>
            <Button color='primary' type='submit'>
              Add Hero Section
            </Button>
            <Button color='danger' onClick={handleDeleteHeroSection} className='ms-2'>
              Delete Hero Section
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddHero;
