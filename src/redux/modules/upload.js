import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

// const FILE_COUNT = 'FILE_COUNT';
const ADD_FILE = 'ADD_FILE';
const COMPLETE_UPLOAD = 'COMPLETE_UPLOAD';
const SHOW_PROGRESS = 'SHOW_PROGRESS';

const initialState = [];

// export const fileCount = createAction(FILE_COUNT);
export const addFile = createAction(ADD_FILE);
export const completeUpload = createAction(COMPLETE_UPLOAD);
export const showProgress = createAction(SHOW_PROGRESS);

export default handleActions(
  {
    [ADD_FILE]: (state, { payload: file }) => {
      return produce(state, (draft) => {
        const isOverlap = draft.find((el) => file.filename === el.filename);
        isOverlap
          ? draft.splice(
              draft.findIndex((el) => file.filename === el.filename),
              1
            )
          : draft.push(file);
        isOverlap && draft.push(file);
      });
    },
    [COMPLETE_UPLOAD]: (state, { payload: isUpLoading }) => {
      return produce(state, (draft) => {
        draft.isUpLoading = isUpLoading;
      });
    },
    [SHOW_PROGRESS]: (state, action) => {
      console.log(state);
      console.log(action);
      return produce(state, (draft) => {
        console.log(1);
      });
    },
  },
  initialState
);
