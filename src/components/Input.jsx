import React, { ChangeEvent, EventHandler, FormEvent, useEffect, useRef, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';

const Input = ({
  label = '',
  maxLength,
  checkedClickToShow = false,
  onChangeClickToShow = () => { },
  clickToShow = false,
  validMsg = '',
  validTrue = false,
  showCharacter,
  validate,
  percent = false,
  editStyle = {},
  deleteStyle = {},
  setDeleteStyle,
  setEditStyle,
  isAbsentField,
  xs = 12,
  md = 12,
  xl = 4,
  rest,
  errors,
  addProps = false,
  errorValidation = false,
  redux = false,
  ltr = false,
  control,
  defaultValue,
  format,
  ref,
  onChange,
  minLength = 1,
  length_num = 50,
  value,
  type = 'text',
  name = '',
  pattern = '',
  className = '',
  // id = "",
  validation,
  currency = false,
  disabled = false,
  important = false,
  normal = true,
  dotCount = 11,
  errmsg = '',
  errmsgmin = '',
  isREQtest,
  errminimum
}) => {
  return (
    <>
      <Col className="my-4" xs={xs} md={md} xl={xl}>
        <Controller
          name={name}
          control={control}
          rules={{
            validate,
            required: { value: isREQtest || validTrue, message: errmsg },
            minLength: { message: errmsgmin, value: errminimum },
            ...validation
          }}
          render={({ field }) => (
            <>
              <Row>
                <Col className={`${isAbsentField && 'd-none'} positionRelative`}>
                  <Form.Label
                    className={`d-flex ms-3 text-start justify-content-start ${important && 'star'}  align-items-center`}>
                    {label}
                  </Form.Label>
                  <span className="">
                    <Form.Control
                      errmsgmin={errmsgmin}
                      errminimum={errminimum}
                      errmsg={errmsg}
                      minLength={minLength}
                      type={type === 'password' ? 'password' : 'text'}
                      value={field.value}
                      onBlur={field.onBlur}
                      ref={field.ref}
                      name={field.name}
                      maxLength={maxLength}
                      disabled={disabled}
                      {...rest}
                      //   onKeyDown={handleKeyPress}
                      onChange={(e) =>
                        currency || type === 'number' || type === 'character'
                          ? handleChange(e, field)
                          : field.onChange(e)
                      }
                      onInput={(e) => {
                        type === 'number' &&
                          !currency &&
                          (e.target.value = e.target.value.replace(/[^\d.]/g, ''));
                      }}
                      className={`input-form ${ltr ? ' dir-ltr ' : ''} ${className} ${errors?.[name] && 'border border-danger'
                        } `}
                    />
                    {addProps && (
                      <span className="fitShowPass d-flex">
                        <i
                          className={` ms-2 ${deleteStyle
                            ? ' test-white d-flex align-items-center justify-content-start font20 fw-bold bi bi-dash-circle-fill rounded-pill fa-disabled'
                            : 'cursorPointer'
                            }  test-white d-flex align-items-center justify-content-start font20 fw-bold bi bi-dash-circle-fill rounded-pill `}
                          onClick={setDeleteStyle}
                          aria-disabled
                        />
                        <i
                          onClick={setEditStyle}
                          className={` ms-2 ${editStyle
                            ? ' test-white d-flex align-items-center justify-content-start font20 fw-bold bi bi-dash-circle-fill rounded-pill bi bi-plus-circle-fill '
                            : 'bi bi-pencil-square cursorPointer'
                            } test-white d-flex  align-items-center justify-content-start font20 fw-bold cursorPointer  rounded-pill`}
                        />
                      </span>
                    )}
                    {percent && <span className="fitShowPass d-flex">%</span>}
                    {clickToShow && (
                      <span className="fitShowPass d-flex">
                        <Form.Check
                          className="cursorPointer"
                          checked={checkedClickToShow}
                          onChange={onChangeClickToShow}
                        />
                      </span>
                    )}
                    {showCharacter && (
                      <>
                        <span className="fitShowPass d-flex">
                          <i
                            className={` ms-2 ${editStyle
                              ? ' test-white bi bi-eye-fill d-flex align-items-center justify-content-start font20 cursorPointer fw-bold  rounded-pill'
                              : 'cursorPointer'
                              }  test-white d-flex align-items-center justify-content-start font20 fw-bold rounded-pill `}
                            onClick={setEditStyle}
                          />
                        </span>
                      </>
                    )}
                  </span>
                </Col>
                {errors?.[name] && (
                  <span className="text-danger font12">{errors?.[name]?.message}</span>
                )}
              </Row>
            </>
          )}
        />
      </Col>
    </>
  );
};

export default Input;
