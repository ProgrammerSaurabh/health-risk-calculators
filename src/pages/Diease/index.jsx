import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Button from '../../components/Button';
import Loader from '../../components/Loader';

const API_URL = 'http://localhost:3001';

const Diease = () => {
  const { disease: diseaseParam } = useParams();
  const navigate = useNavigate();

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
      <div className='w-full max-w-[70rem] mx-auto p-4 pt-6'>
        {loader ? (
          <div className='flex flex-col gap-3 justify-center items-center'>
            <Loader />
            <p>Loading...</p>
          </div>
        ) : (
          <>
            <h2 className='text-3xl text-primary border-b-2 pb-2'>
              {disease?.name}
            </h2>
            <section className='text-primary/80'>
              <p className='my-2 mt-4'>{disease?.description}</p>
            </section>
            <Button
              label={'Calculate'}
              onClick={() => navigate(`/${disease?.id}/calculator`)}
            />
          </>
        )}
      </div>
    </Layout>
  );
};

export default Diease;
