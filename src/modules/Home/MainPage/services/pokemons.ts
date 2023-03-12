import BaseService from "@core/class/BaseService";


class pokemonsService extends BaseService {
  public getList = (params?: Record<string, any>) => {
    if(params?.sort) {
      return this.get(`type/${params.sort}`);
    }
    else return this.get("pokemon?name=pikachu",params);
  };
  public getListFilter = (params?: Record<string, any>) => {
    return this.get("type",params);
  };
  public getListType = () => {
    return this.get("type");
  };
  public getDetail = (pokemon: string) => {
    return this.get(`pokemon/${pokemon}`);
  };
}

export default new pokemonsService("/", false);
