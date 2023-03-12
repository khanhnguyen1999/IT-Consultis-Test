import useTranslate from "@core/hooks/useTranslate";
import { FilterOption, SearchFieldAttr, SearchGroup } from "@core/interfaces";
import { Button, Descriptions, Form, Space } from "antd";
import { Fragment } from "react";
import CheckBox from "./CheckBox";
import DateTime from "./DateTime";
import Radio from "./Radio";
import RangeDateTime from "./RangeDateTime";
import Selector from "./Selector";
import Text from "./Text";


interface Props {
  title: string;
  fields: SearchFieldAttr[];
  onSearch: (values: any) => void;
  extra?: JSX.Element;
  footer?: {
    component: JSX.Element;
    span: number;
  };
  column?: number;
}

const Search = ({
  title,
  fields,
  onSearch,
  extra,
  footer,
  column = 3,
}: Props) => {
  const [t] = useTranslate();
  const [form] = Form.useForm();

  const renderFilterType = (filter: SearchGroup) => {
    let data = filter.data;
    const { type, name, convertHTML } = filter;

    if (type === "radio" || type === "selector" || type === "checkbox") {
      if (!data) {
        data = [];
      }
    }

    switch (filter.type) {
    case "text":
      return <Text className={filter.className} name={name} />;
    case "radio":
      return (
        <Radio
          className={filter.className}
          name={name}
          data={data as FilterOption[]}
          convertHTML={convertHTML}
        />
      );
    case "selector":
      return (
        <Selector
          className={filter.className}
          name={name}
          data={data as FilterOption[]}
        />
      );
    case "date":
      return <DateTime className={filter.className} name={name} />;
    case "group":
      return (
        <Space size={8}>
          {(data as SearchGroup[]).map((group) => (
            <Fragment key={group.name}>{renderFilterType(group)}</Fragment>
          ))}
        </Space>
      );
    case "rangeDate":
      return <RangeDateTime className={filter.className} name={name} />;
    case "checkbox":
      return <CheckBox className={filter.className} name={name}  data={data as FilterOption[]}/>;
    default:
      return null;
    }
  };

  const onFinish = (values: any) => {
    const filter = fields.reduce((prev: Record<string, any>, field) => {
      if (field.removeWhenValueIsAll && values[field.name] === "all") {
        return prev;
      }

      if (values[field.name]) {
        let value = values[field.name];

        if (field.opt === "$like") {
          value = value;
        }

        prev[field.name] = { [field.opt]: value };
      }

      return prev;
    }, {});

    onSearch(filter);
  };

  const handleClear = () =>  onSearch("");

  return (
    <div className="core-search">
      <Form form={form} onFinish={onFinish}>
        <Descriptions
          bordered
          column={column}
          title={title}
          size="middle"
          extra={extra}
        >
          {fields?.map((field) => {
            return (
              <Descriptions.Item
                style={{width: '50%'}}
                span={field.span}
                key={field.name}
                label={field.label}
              >
                {renderFilterType(field)}
              </Descriptions.Item>
            );
          })}
          {footer ? (
            <Descriptions.Item span={footer.span}>
              {footer.component}
            </Descriptions.Item>
          ) : null}
        </Descriptions>
        <div style={{display: 'flex', width: "200px", margin: "auto"}}>
          <Button
            htmlType="submit"
            className="btn-search"
            style={{ display: "flex", margin: "15px 10px" }}
          >
            {t("common:filter:search")}
          </Button>
          <Button
            htmlType="button"
            danger
            style={{ display: "flex", margin: "15px 10px" }}
            onClick={()=>handleClear()}
          >
            Clear
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Search;
