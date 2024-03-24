import React, { useState } from 'react';
import Input from '../Input';
import Button from '../Button';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import Select from '../Select';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3001';

const Forms = ({ test, formula, fields = [] }) => {
  const [answers, setAnswers] = useState({});
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const inputChangeHandler = (field, value) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  };

  const submitHandler = async () => {
    const missings = fields
      .filter(
        (field) =>
          answers[field.name] == undefined ||
          (field.type == 'select' && answers[field.name] == 'Select')
      )
      .map((field) => `${field.label}`);

    if (missings.length > 0) {
      return toast.error(missings.join(', ') + ' is/are required!');
    }

    let finalFormula = formula;

    fields.forEach(
      (field) =>
        (finalFormula = finalFormula.replaceAll(
          `{${field.name}}`,
          answers[field.name]
        ))
    );

    const result = eval(finalFormula);

    const id = uuidv4();

    const data = {
      calculatorId: test,
      id,
      answers: Object.keys(answers).map((answer) => ({
        name: answer,
        value: answers[answer],
      })),
      result,
    };

    setLoader(true);
    try {
      await axios.post(`${API_URL}/results`, data);

      navigate(`/${test}/calculator/${id}/result`);
    } catch (error) {
    } finally {
      setLoader(false);
    }
  };

  return (
    <div>
      {fields.map((field, fieldIndex) => {
        if (field.type == 'input') {
          return (
            <Input
              key={`field-${field.name}`}
              value={answers[field.name] ?? ''}
              label={field.label}
              placeHolder={field.placeholder}
              onChange={(e) => inputChangeHandler(field.name, e.target.value)}
              classes={'mb-4'}
              autoFocus={fieldIndex == 0}
              name={field.name}
            />
          );
        }
        if (field.type == 'select') {
          return (
            <Select
              key={`field-${field.name}`}
              value={answers[field.name]}
              label={field.label}
              onChange={(e) => inputChangeHandler(field.name, e.target.value)}
              name={field.name}
              options={field.options}
            />
          );
        }
      })}
      <Button
        label={loader ? 'Calculating...' : 'Calculate'}
        onClick={submitHandler}
      />
    </div>
  );
};

export default Forms;
