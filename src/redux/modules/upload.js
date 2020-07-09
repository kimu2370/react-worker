import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const GET_FILE_LIST = 'GET_FILE_LIST';
const IS_LOADING = 'IS_LOADING';
const FILE_SIZE = 'FILE_SIZE';
const GET_FILE = 'GET_FILE';

const initialState = {
  list: [],
  isLoading: false,
  filename: '',
  content: '',
  size: 0,
};

export const getFileList = createAction(GET_FILE_LIST);
export const isLoading = createAction(IS_LOADING);
export const fileSize = createAction(FILE_SIZE);
export const getFile = createAction(GET_FILE);

export default handleActions(
  {
    [GET_FILE_LIST]: (state, { payload: list }) => {
      produce(state, (draft) => {
        draft.list = list;
      });
    },
    [IS_LOADING]: (state, { payload: isLoading }) => {
      produce(state, (draft) => {
        draft.isLoading = isLoading;
      });
    },
    [FILE_SIZE]: (state, { payload: size }) => {
      console.log(size);
      produce(state, (draft) => {
        draft.size = size;
      });
    },
    [GET_FILE]: (state, { payload: file }) => {
      produce(state, (draft) => {
        draft.file = file;
      });
    },
  },
  initialState
);
