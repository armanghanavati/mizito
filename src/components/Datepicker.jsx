import React, { FormEvent, useEffect, useRef, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import { Button, Col, Form, Row } from "react-bootstrap";
import persian_fa from "react-date-object/locales/persian_fa";
import { Controller } from "react-hook-form";
import "react-multi-date-picker/styles/layouts/mobile.css";
import "react-multi-date-picker/styles/colors/green.css";
import { useMediaQuery } from "react-responsive";

const Datepicker = ({
    field,
    ref,
    ltr = false,
    validTrue = false,
    errValueMin = false,
    xs = 12,
    errmsgmin = "",
    md = 6,
    xl = 4,
    validate,
    name = "",
    normal = true,
    isDisabled = false,
    validation,
    format,
    onlyMonthPicker,
    control,
    errmsg = "",
    className,
    label,
    value,
    onChange = () => { },
    persianType = "per",
    minDate,
    maxDate,
    important,
    register,
    errors,
    range,
}) => {
    // const [calendar, setCalendar] = useState("");

    const weekDays = [
        ["شنبه", "ش"],
        ["یکشنبه", "ی"],
        ["دوشنبه", "د"],
        ["سه شنبه", "س"],
        ["چهارشنبه", "چ"],
        ["پنجشنبه", "پ"],
        ["جمعه", "ج"],
    ];

    const isSmallScreen = useMediaQuery({ query: "(max-width: 750px)" });

    return (
        <>
            <Controller
                name={name}
                control={control}
                rules={{
                    validate,
                    required: { validTrue, message: errmsg },
                    minLength: { message: errmsgmin, value: errValueMin },
                    ...validation,
                }}
                render={({ field }) => (
                    <>
                        <Col
                            className={`mt-4`}
                            xs={xs}
                            md={md}
                            xl={xl}
                        >
                            <Form.Label
                                className={` align-items-center ${important && "star"
                                    }`}
                            >
                                {label}
                            </Form.Label>
                            <DatePicker
                                format={format}
                                onlyMonthPicker={onlyMonthPicker}
                                weekDays={weekDays}
                                className={`input-form green ${isSmallScreen && "rmdp-mobile"
                                    } ${ltr ? " dir-ltr " : ""} ${className} `}
                                editable={false}
                                name={field.name}
                                disabled={field.disabled || isDisabled}
                                value={field.value}
                                onChange={field?.onChange}
                                minDate={minDate}
                                maxDate={maxDate}
                                range={range}
                                monthYearSeparator={" "}
                                inputClass={`form-control dir-ltr  ${errors?.[name] && "border border-danger"
                                    } ${className}  `}
                                calendar={persianType === "per" ? persian : undefined}
                                locale={persianType === "per" ? persian_fa : undefined}
                            >
                                {/* <Button
                                    variant="outline-success"
                                    className="mb-2"
                                    style={{ margin: "5px" }}
                                    onClick={() => field?.onChange(null)}
                                >
                                    لغو انتخاب
                                </Button> */}
                            </DatePicker>
                            {errors?.[name] && (
                                <span className="text-danger font12">
                                    {" "}
                                    {errors?.[name]?.message}{" "}
                                </span>
                            )}
                        </Col>
                    </>
                )}
            />
        </>
    );
};

export default Datepicker;
