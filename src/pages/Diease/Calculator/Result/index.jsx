import React, { useEffect, useState } from 'react';
import Layout from '../../../../components/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../../../components/Loader';

const API_URL = 'http://localhost:3001';

const Result = () => {
  const { result: resultParam } = useParams();

  const [data, setData] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const loadResult = async () => {
      try {
        setLoader(true);

        const { data } = await axios.get(
          `${API_URL}/results/${resultParam}?_embed=calculator`
        );

        setData(data);
      } catch (error) {
      } finally {
        setLoader(false);
      }
    };

    loadResult();
  }, [resultParam]);

  const loadAnswer = (name) => {
    return data?.answers?.find((answer) => answer?.name == name)?.value ?? 'NA';
  };

  const interpretation = data?.calculator?.interpretations?.find(
    (interpretation) =>
      interpretation?.min < data?.result && interpretation?.max > data?.result
  )?.value;

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
            <h2 className='text-3xl text-primary border-b-2 pb-2 text-center'>
              {data?.calculator?.name} result
            </h2>
            <p className='text-center text-2xl pt-4 pb-3'>
              {data?.calculator?.resultText?.replaceAll(
                '{result}',
                data?.result
              )}
            </p>
            {interpretation && (
              <p className='text-center text-primary text-xl pb-4'>
                {interpretation}
              </p>
            )}
            <p className='text-xl border-b-2 pb-2'>Answers</p>
            {data?.calculator?.fields?.map((field) => (
              <div
                key={`result-${field.name}`}
                className='flex justify-start items-center my-2 gap-3'
              >
                <div>{field.label}:</div>
                <div>{loadAnswer(field.name)}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </Layout>
  );
};

export default Result;
