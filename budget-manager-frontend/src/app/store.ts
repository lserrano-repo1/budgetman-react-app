import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import AppSlice from './AppSlice'; 
import PersonSlice from '../features/Person/personSlice';
import BankSlice from '../features/Bank/bankSlice';
import DashboardSlice from '../features/Dashboard/dashboardSlice';
import TranHistory from '../features/TranHistory/tranHistorySlice';
import Transaction from '../features/Transactions/transactionSlice';
import AccTransfer from '../features/Transfer/transferenceSlice';
import Account from '../features/Account/accountSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    appReducer: AppSlice,
    personReducer: PersonSlice,
    bankReducer: BankSlice,
    dashboardReducer: DashboardSlice,
    tranHistoryReducer : TranHistory,
    transactionReducer : Transaction,
    transferReducer : AccTransfer,
    accountReducer: Account,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
