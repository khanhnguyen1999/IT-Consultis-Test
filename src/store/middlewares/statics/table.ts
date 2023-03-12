import { Action } from "@core/interfaces";
import * as actions from "@store/actions/table";
import { get_action_table } from "@store/reducers/pattern/table";
import { call, put, takeEvery } from "redux-saga/effects";

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

function* get_table_data_source_worker(
  action: Action<string, actions.GetTableDataSourcePayload>,
): Generator<any, void, any> {
  const { identity, api, method, pageIndex, pageSize, filters } = action.payload!;

  yield put({
    type: get_action_table(identity, actions.GET_TABLE_DATA_SOURCE_REQUEST),
  }); // trigger loading

  const newFilters = { ...filters };

  try {
    const params = { limit: pageSize, offset: pageSize * (pageIndex - 1), sort: newFilters?.type?.$eq };
    const res: ThenArg<ReturnType<typeof api.getList>> = yield call(api[method], params);

    const result: any[] = [];
    const sortData: any[] = [];
    if(params.sort) {
      res.pokemon.map((item)=>{
        sortData.push(item.pokemon);
      });
      for (const pokemon of sortData) {
        const response = yield call(fetch, `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        const data = yield response.json();
        result.push(data);
      }
    }
    if(!params.sort) {
      for (const pokemon of res.results) {
        const response = yield call(fetch, `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        const data = yield response.json();
        result.push(data);
      }
    }

    const payload = {
      dataSource: result,
      pagination: !params.sort ? { total: res.count, current: pageIndex, pageSize } : sortData.length,
    };

    yield put({
      type: get_action_table(identity, actions.GET_TABLE_DATA_SOURCE_SUCCESS),
      payload,
    });
  } catch (error) {
    yield put({
      type: get_action_table(identity, actions.GET_TABLE_DATA_SOURCE_FAILURE),
    });
  }
}

export function* get_table_data_source_watcher() {
  yield takeEvery(actions.GET_TABLE_DATA_SOURCE_REQUEST, get_table_data_source_worker);
}
