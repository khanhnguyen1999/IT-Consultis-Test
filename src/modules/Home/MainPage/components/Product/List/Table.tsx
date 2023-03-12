import Table from "@core/components/Table";
import { TranslateFn } from "@core/hooks/useTranslate";
import { name as identity } from "@Home/MainPage/reducers/pokemons";
import pokemonsApi from "@Home/MainPage/services/pokemons";


interface Props {
  t: TranslateFn;
  filters: Record<string, any>;
}

const ListTable = ({ t, filters }: Props) => {
  const columns = [
    {
      title: "Id Pokemon",
      dataIndex: "id",
      width: 175,
    },
    {
      title: "Image Pokemon",
      width: 175,
      render: (data: any) =>
        <img src={data.sprites["front_default"]} alt={data.name}  className="card-img-top"/>,
    },
    {
      title: "Name Pokemon",
      dataIndex: "name",
      width: 175,
    },
    {
      title: "Type Pokemon",
      width: 200,
      render: (data: any) => (
        <>{data.types.map((item: any,index: number)=>(
          <p key={`TYPE:${index}`} style={{textTransform: "capitalize"}}>{item.type.name}</p>
        ))}</>
      ),
    },
  ];

  return (
    <Table
      filters={filters}
      columns={columns}
      identity={identity}
      api={pokemonsApi}
    />
  );
};

export default ListTable;
