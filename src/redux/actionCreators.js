import { bindActionCreators } from 'redux';

import store from './store';
import * as uploadActions from './modules/upload';

const { dispatch } = store;

const UploadActions = bindActionCreators(uploadActions, dispatch);

export { UploadActions }; // component가 사용할 action 함수들
