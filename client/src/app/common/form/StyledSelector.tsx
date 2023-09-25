import { useField } from "formik";
import { Form, Label, Select } from "semantic-ui-react";

interface Props {
  placeholder: string;
  name: string;
  label?: string;
  options: { text: string; value: string }[];
}

const StyledSelector = (props: Props) => {
  const [field, meta, helpers] = useField(props.name);

  return (
    <Form.Field error={meta.touched && Boolean(meta.error)}>
      <Select
        clearable
        options={props.options}
        value={field.value || null}
        onChange={(_, d) => helpers.setValue(d.value)}
        onBlur={() => helpers.setTouched(true)}
        placeholder={props.placeholder}
      />
      {meta.touched && meta.error && (
        <Label basic color="red">
          {meta.error}
        </Label>
      )}
    </Form.Field>
  );
};
export default StyledSelector;
