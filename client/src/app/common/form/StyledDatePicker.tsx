import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";

const StyledDatePicker = (props: Omit<ReactDatePickerProps, "onChange">) => {
  const [field, meta, helpers] = useField(props.name!);

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <DatePicker
        {...props}
        selected={new Date(field.value) || null}
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
