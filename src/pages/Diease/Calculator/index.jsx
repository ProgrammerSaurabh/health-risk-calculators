import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../../components/Loader';
import Forms from '../../../components/Forms';

const API_URL = 'http://localhost:3001';

const Calculator = () => {
  const { disease: diseaseParam } = useParams();

  const [disease, setDisease] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const loadDisease = async () => {
      try {
        setLoader(true);

        const { data } = await axios.get(
          `${API_URL}/calculators/${diseaseParam}`
        );

        setDisease(data);
      } catch (error) {
      } finally {
        setLoader(false);
      }
    };

    loadDisease();
  }, [diseaseParam]);

  return (
    <Layout>
      {loader ? (
        <div className='flex flex-col gap-3 justify-center items-center'>
          <Loader />
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <div className='w-full max-w-[70rem] mx-auto p-4 pt-6'>
            <h2 className='text-3xl text-primary border-b-2 pb-2'>
              {disease?.name} calculator
            </h2>
            <Forms
              test={disease?.id}
              formula={disease?.formula}
              fields={disease?.fields}
            />
          </div>
        </>
      )}
    </Layout>
  );
};

export default Calculator;
