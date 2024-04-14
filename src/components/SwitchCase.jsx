import { Container, Row } from 'react-bootstrap';
import FormRange from 'react-bootstrap/FormRange';
import React, { ChangeEvent, useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import { Controller } from 'react-hook-form';

const SwitchCase = ({
  range,
  normal = true,
  label,
  name,
  checked,
  onChecked,
  className,
  control,
  radioType = false
}) => {
  const [value, setValue] = useState(50);

  return (
    <>
      {range ? (
        <>
          <label htmlFor={name} className="">
            {label}
            <span> {value}</span>
          </label>
          <Col style={{ direction: 'ltr' }} className="d-flex align-items-start">
            <FormRange
              //   style={{ transform: 'scale(-1, 1)', direction: 'ltr' }}
              name={name}
              value={value}
              onChange={(event) => {
                setValue(event.target.value);
              }}
            />
          </Col>
        </>
      ) : radioType ? (
        <Col className=" d-flex align-items-end">
          <label className="">{label} </label>
          <Form.Check type="radio" aria-label="radio 1" checked={checked} onChange={onChecked} />
        </Col>
      ) : control ? (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <>
              <Col className=" d-flex align-items-end">
                <Form.Check
                  className={`d-flex justify-content-center mb-1 cursorPointer ${className}`}
                  color="#00000"
                  width={400}
                  {...field}
                  id={name}
                  type="checkbox"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
                <label htmlFor={name} className="px-2">
                  {label}
                </label>
              </Col>
            </>
          )}
        />
      ) : (
        <Col className=" d-flex align-items-start">
          <Form.Check inline label={label} name={name} className={className} type="checkbox" />
          {/* <label htmlFor={name} className="px-2">
                            {label}
                        </label> */}
        </Col>
      )}
    </>
  );
};

export default SwitchCase;
