import * as usersService from '../services/users';
import { PAGE_SIZE } from '../constants';

debugger;
export default {
  namespace: 'indexPage',
  state: {
    list: [],
    /*total: null,
    page: null,*/
    pagination: {
      current: 1,
      total: null
    },
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload};
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      debugger;
      const  data  = yield call(usersService.fetch, payload);
      if (data && data.code=='0') {
        console.info("the model data is -----");
        console.log(data.data);
          yield put({
          type: 'save',
          payload: {
            list:data.data,
            total: data.totalCount
          },
        });
      }
      
    },

   /* *remove({ payload: id }, { call, put }) {
      yield call(usersService.remove, id);
      yield put({ type: 'reload' });
    },
    *patch({ payload: { id, values } }, { call, put }) {
      yield call(usersService.patch, id, values);
      yield put({ type: 'reload' });
    },
    *create({ payload: values }, { call, put }) {
      yield call(usersService.create, values);
      yield put({ type: 'reload' });
    },
    *reload(action, { put, select }) {
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    },*/
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/users') {
          dispatch({ type: 'fetch', payload: {
                pageSize: PAGE_SIZE, 
                current: 1, 
            }
             });
        }
      });
    },
  },
};

