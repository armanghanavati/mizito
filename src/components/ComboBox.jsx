import Select from 'react-select';
import React from 'react';
import { Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';

const ComboBox = ({
  validate,
  errValueMin = false,
  validTrue = false,
  errmsgmin = '',
  errmsg = '',
  name = '',
  xs = 12,
  md = 6,
  xl = 4,
  label = '',
  options,
  onKeyDown,
  onBlur = () => {},
  defaultValue = {},
  onChange = () => {},
  validation,
  control = true,
  important = false,
  normal = true,
  isDisabled = false,
  isClearable = false,
  loading = false,
  placeHolder = '',
  selectedOption,
  optionValue = (option) => option.id,
  optionLabel = (option) => option.title,
  className = '',
  isMulti,
  palaceHolder = '',
  errors,
  field
}) => {
  const { main } = useSelector((state) => state);

  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{
          validate,
          required: { value: validTrue, message: errmsg },
          minLength: { message: errmsgmin, value: errValueMin },
          ...validation
        }}
        render={({ field }) => (
          <>
            <Col className="mt-4" xs={xs} md={md} xl={xl}>
              <label
                className={`ms-3 ${
                  important && 'star'
                }  align-items-center input-label input-label-sm lg:input-label-base`}>
                {label}
              </label>
              <Select
                isRtl
                {...field}
                placeholder={palaceHolder}
                isMulti={isMulti}
                isLoading={loading || main?.showLoading?.value}
                onKeyDown={onKeyDown}
                isDisabled={isDisabled}
                options={options}
                isClearable={isClearable}
                getOptionLabel={optionLabel}
                getOptionValue={optionValue}
                menuPortalTarget={document.body}
                className={`select ${className}`}
                loadingMessage={() => 'درحال بارگذاری'}
                noOptionsMessage={() => 'موجود نیست'}
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 9999 })
                }}
              />
              {errors?.[name] && (
                <span className="text-danger font12"> {errors?.[name]?.message} </span>
              )}
            </Col>
          </>
        )}
      />
    </>
  );
};

export default ComboBox;
