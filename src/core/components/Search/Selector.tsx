import { FilterOption } from "@core/interfaces";
import { Form, Select } from "antd";


interface Props {
  data: FilterOption[];
  name: string;
  className?: string;
}

const Selector = ({ data, name, className }: Props) => {
  return (
    <Form.Item name={name} className={className}>
      <Select placeholder="Please select...">
        {data?.map((item: FilterOption) => (
          <Select.Option style={{textTransform: "capitalize"}} key={item.value} value={item.value}>
            <p style={{textTransform: "capitalize"}}>{item.label}</p>
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Selector;
