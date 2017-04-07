import { delay } from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';

let count = 0;
export function* sendMessage() {
    yield call(delay, 1000);
    yield put({ type: 'TIMEOUT_END', message: count++ });
}

export function* watchTimeout() {
    yield takeEvery('TIMEOUT', sendMessage);
}

export default function* rootSaga() {
    yield [
        watchTimeout()
    ]
}