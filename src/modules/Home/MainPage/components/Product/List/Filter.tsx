import Search from "@core/components/Search";
import { TranslateFn } from "@core/hooks/useTranslate";
import { SearchFieldAttr } from "@core/interfaces";
import pokemonsApi from "@Home/MainPage/services/pokemons";
import {
  // eslint-disable-next-line comma-dangle
  Spin
} from "antd";
import { useEffect, useState } from "react";

interface Props {
  t: TranslateFn;
  setFilters: (values: any) => void;
}

const ListFilter = ({ t, setFilters }: Props) => {
  const [types,setTypes] = useState<any[]>([]);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    getListType();
  }, []);

  const getListType = async () => {
    setLoading(true);
    try {
      const res = await pokemonsApi.getListType();
      res.results.map((item: any,index: number)=>{
        const data = {
          value: index+1,
          label: item.name,
        };
        setTypes(prev=>[...prev,data]);
      });
    } catch (error: any) {
      console.log(error);
    }

    setLoading(false);
  };

  const fields: SearchFieldAttr[] = [
    {
      label: "Type Pokemon",
      span: 8,
      name: "type",
      type: "selector",
      opt: "$eq",
      data: types,
    },
  ];

  const onSearch = (values: any) => {
    setFilters(values);
  };

  return (
    <div className="filter-store-business">
      <Spin spinning={loading}>
        <Search
          title="POKEMON LIST"
          column={2}
          fields={fields}
          onSearch={onSearch}
        />
      </Spin>
    </div>
  );
};

export default ListFilter;
