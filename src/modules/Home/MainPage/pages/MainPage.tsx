import useTranslate from "@core/hooks/useTranslate";
import ProductListFilter from "@Home/MainPage/components/Product/List/Filter";
import ProductListTable from "@Home/MainPage/components/Product/List/Table";
import { Content } from "antd/lib/layout/layout";
import { useState } from "react";


interface Props {}

const MainPage = (props: Props) => {

  const [t] = useTranslate();

  /* State */
  const [filters, setFilters] = useState({});

  return (
    <div className="container" style={{padding: "5rem 0"}}>
      <Content>
        <div className="store-business-inner">
          <ProductListFilter t={t} setFilters={setFilters} />
          <ProductListTable t={t} filters={filters} />
        </div>
      </Content>
    </div>
  );
};

export default MainPage;
