import React from 'react';

const Select = ({
  value,
  label,
  name,
  options = [],
  onChange = () => null,
  error = null,
}) => {
  return (
    <>
      <div className='flex flex-col w-full mb-4'>
        {label && <label className='!text-left mb-2'>{label}</label>}
        <select
          value={value}
          name={name}
          onChange={onChange}
          className='border border-primary rounded-lg p-3 border-r-8 border-transparent px-4 outline outline-neutral-400'
        >
          <option defaultValue={null}>Select</option>
          {options.map((option) => (
            <option
              key={`select-option-${option.value}`}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <span className='text-red-400 text-sm'>
            <sup>**</sup>
            {error}
          </span>
        )}
      </div>
    </>
  );
};

export default Select;
