import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Step1 from './Step1';

import styles from '../style';  // Adjust the import path if necessary
import { layout } from '../style';  // Adjust the import path if necessary

const MultiStepForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
  });

  const navigate = useNavigate();

  const handleNext = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    // Navigate to the next step
    // You will need to implement navigation logic here
  };

  return (
    <div className={`${styles.paddingY} ${styles.flexCenter} bg-black-gradient`}>
      <div className={`${styles.boxWidth} ${layout.section}`}>
        <Routes>
          <Route path="/" element={<Step1 next={handleNext} />} />
          
        </Routes>
      </div>
    </div>
  );
};

export default MultiStepForm;
