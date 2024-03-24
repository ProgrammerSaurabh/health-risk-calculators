import React from 'react';

const Input = ({
  value,
  placeHolder,
  label = null,
  hint = null,
  onChange = (e) => null,
  classes = null,
  error = null,
  ...rest
}) => {
  return (
    <div className='flex flex-col w-full'>
      {label && <label className='!text-left mb-2'>{label}</label>}
      <input
        value={value}
        placeholder={placeHolder}
        onChange={onChange}
        className={`px-3 py-4 rounded-lg border ${classes} ${
          error ? 'border-red-700' : 'border-primary'
        }`}
        {...rest}
      />
      {error && (
        <span className='text-red-400 text-sm'>
          <sup>**</sup>
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
