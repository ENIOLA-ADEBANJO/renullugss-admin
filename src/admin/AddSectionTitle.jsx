import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import { db } from '../firebase.config';
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore'; // Import deleteDoc and doc
import useGetData from '../custom-hooks/useGetData';

const AddSectionTitle = () => {
  const [sectionTitles, setSectionTitles] = useState({
    firstSection: '',
    secondSection: '',
    thirdSection: '',
    fourthSection: '',
  });

  const { data: sectionTitlesData } = useGetData('sectionTitles');

  useEffect(() => {
    if (sectionTitlesData.length > 0) {
      setSectionTitles(sectionTitlesData[0]);
    }
  }, [sectionTitlesData]);

  const handleAddSectionTitles = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, 'sectionTitles'), sectionTitles);

      toast.success('Section titles added successfully!');
      setSectionTitles({
        firstSection: '',
        secondSection: '',
        thirdSection: '',
        fourthSection: '',
      });
      console.log('New section titles ID:', docRef.id);
    } catch (error) {
      toast.error('Failed to add section titles.');
      console.error(error);
    }
  };

  const handleResetSectionTitles = async () => {
    try {
      // Delete the section titles document from the database
      await deleteDoc(doc(db, 'sectionTitles', sectionTitlesData[0].id));

      toast.success('Section titles reset successfully!');
      setSectionTitles({
        firstSection: '',
        secondSection: '',
        thirdSection: '',
        fourthSection: '',
      });
    } catch (error) {
      toast.error('Failed to reset section titles.');
      console.error(error);
    }
  };

  return (
    <Container>
      <Row>
        <Col lg='8' className='mx-auto mt-4'>
          <h4 className='mb-4'>Add Section Titles</h4>
          <Form onSubmit={handleAddSectionTitles}>
          <FormGroup>
              <Label for='firstSection'>First Section Title</Label>
              <Input
                type='text'
                name='firstSection'
                id='firstSection'
                value={sectionTitles.firstSection}
                onChange={(e) => setSectionTitles({ ...sectionTitles, firstSection: e.target.value })}
                placeholder='Enter first section title'
              />
            </FormGroup>
            <FormGroup>
              <Label for='secondSection'>Second Section Title</Label>
              <Input
                type='text'
                name='secondSection'
                id='secondSection'
                value={sectionTitles.secondSection}
                onChange={(e) => setSectionTitles({ ...sectionTitles, secondSection: e.target.value })}
                placeholder='Enter second section title'
              />
            </FormGroup>
            <FormGroup>
              <Label for='thirdSection'>Third Section Title</Label>
              <Input
                type='text'
                name='thirdSection'
                id='thirdSection'
                value={sectionTitles.thirdSection}
                onChange={(e) => setSectionTitles({ ...sectionTitles, thirdSection: e.target.value })}
                placeholder='Enter third section title'
              />
            </FormGroup>
            <FormGroup>
              <Label for='fourthSection'>Fourth Section Title</Label>
              <Input
                type='text'
                name='fourthSection'
                id='fourthSection'
                value={sectionTitles.fourthSection}
                onChange={(e) => setSectionTitles({ ...sectionTitles, fourthSection: e.target.value })}
                placeholder='Enter fourth section title'
              />
            </FormGroup>
            <Button color='primary' type='submit'>
              Add Section Titles
            </Button>
            <Button color='danger' onClick={handleResetSectionTitles} className='ms-2'>
              Reset Section Titles
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddSectionTitle;
