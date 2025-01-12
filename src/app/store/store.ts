import { configureStore } from "@reduxjs/toolkit";
import stockSlice from '@/features/stocks/StockSlice'

const store = configureStore({
    reducer: {
        stocks: stockSlice
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch