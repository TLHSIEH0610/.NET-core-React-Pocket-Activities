import React from "react";
import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import { DateTime } from "luxon";

const JsDateToISO = (JsDate: Date) => DateTime.fromJSDate(JsDate).toISO();

const StyledDatePicker = (props: Omit<ReactDatePickerProps, "onChange">) => {
  const [field, meta, helpers] = useField(props.name!);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <DatePicker
        {...field}
        {...props}
        selected={field.value || null}
        onChange={(value) => helpers.setValue(value)}
      />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
};

export default StyledDatePicker;
