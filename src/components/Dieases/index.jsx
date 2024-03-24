import React, { useEffect, useState } from 'react';
import DieaseCard from '../DieaseCard';

import axios from 'axios';

const API_URL = 'http://localhost:3001';

const Dieases = () => {
  const [dieases, setDieases] = useState([]);

  useEffect(() => {
    const loadCalculators = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/calculators`);

        setDieases(data);
      } catch (error) {}
    };

    loadCalculators();
  }, []);

  return (
    <div className='w-full max-w-[70rem] mx-auto p-4 pt-6'>
      <h2 className='text-3xl text-primary border-b-2 pb-2'>
        Health Risk Calculators
      </h2>
      <section className='text-primary/80'>
        <p className='my-2 mt-4'>
          Health risk calculators are valuable tools used in healthcare to
          assess an individual's risk of developing certain health conditions or
          experiencing adverse health events. These calculators utilize various
          factors such as age, gender, lifestyle habits, and medical history to
          generate personalized risk estimates. Common health risk calculators
          include those for cardiovascular disease, osteoporotic fractures,
          cancer risk, and metabolic disorders like diabetes.
        </p>

        <p className='my-2'>
          By inputting relevant information into these calculators, individuals
          and healthcare professionals can gain insights into potential health
          risks and take proactive measures to mitigate them. For example, a
          cardiovascular risk calculator can estimate an individual's likelihood
          of experiencing a heart attack or stroke within a certain timeframe,
          prompting lifestyle modifications or medical interventions as needed.
        </p>

        <p>
          Health risk calculators play a crucial role in preventive medicine by
          identifying high-risk individuals who may benefit from early
          interventions such as lifestyle changes, medication, or regular
          screenings. Additionally, they promote patient engagement and
          empowerment by fostering awareness of personal health risks and
          motivating individuals to make healthier choices. Overall, these
          calculators serve as valuable tools in promoting proactive health
          management and reducing the burden of preventable diseases.
        </p>
      </section>

      <div className='grid grid-cols-2 md:grid-cols-3 justify-center gap-4 mt-8'>
        {dieases.map((diease) => (
          <DieaseCard
            key={`diease-${diease.id}`}
            name={diease.name}
            slug={diease.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Dieases;
