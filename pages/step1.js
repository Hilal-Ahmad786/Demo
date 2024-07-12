import { useState } from 'react';
import { useRouter } from 'next/router';
import CustomRadioButton from '../components/CustomRadioButton';
import styled from '@emotion/styled';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const Container = styled.div`
  padding: 32px;
`;

const Button = styled.button`
  margin-top: 16px;
  padding: 16px 32px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
`;

const Step1 = () => {
  const [selection, setSelection] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setSelection(e.target.value);
  };

  const nextStep = () => {
    const basePath = publicRuntimeConfig.basePath;
    if (selection === 'Taleb') {
      router.push(`${basePath}/step2a`);
    } else if (selection === 'Şikayet') {
      router.push(`${basePath}/step2b`);
    } else if (selection === 'Öneri') {
      router.push(`${basePath}/step2c`);
    }
  };

  return (
    <Container>
      <h1>Başvuru Türünüzü Seçiniz</h1>
      <CustomRadioButton name="type" value="Taleb" label="Taleb" onChange={handleChange} checked={selection === 'Taleb'} />
      <CustomRadioButton name="type" value="Şikayet" label="Şikayet" onChange={handleChange} checked={selection === 'Şikayet'} />
      <CustomRadioButton name="type" value="Öneri" label="Öneri" onChange={handleChange} checked={selection === 'Öneri'} />
      <Button onClick={nextStep}>Next</Button>
    </Container>
  );
};

export default Step1;
