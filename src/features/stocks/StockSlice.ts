import { Stock } from '@/types/stock'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

interface InitialState {
    stocks: Stock[];
    totalPage: number;
    loading: boolean;
    error: string;
}

const initialState: InitialState = {
    loading: false,
    stocks: [],
    error: '',
    totalPage: 0
}

export const fetchStocks = createAsyncThunk('stocks/fetchStocks', async ({currentPage}: {
    currentPage: number
}) => {
    return fetch(`/api/stocks?page=${currentPage}&limit=300`).then((res) => res.json())
})

const stockSlice = createSlice({
    name: 'stock',
    initialState,
    reducers: {
        setStocks: (state, action: PayloadAction<Stock[]>) => {
            state.stocks = action.payload
        },
        sortStocksByPrice: (state, action: PayloadAction<'asc' | 'desc'>) => {
            state.stocks.sort((a, b) => action.payload === 'asc' ? parseFloat(a.price) - parseFloat(b.price) : parseFloat(b.price) - parseFloat(a.price))
        },
        sortStocksByName: (state, action: PayloadAction<'asc' | 'desc'>) => {
            const sortOrder = action.payload;
            state.stocks.sort((a, b) => {
            if (a.company < b.company) return sortOrder === 'asc' ? -1 : 1;
            if (a.company > b.company) return sortOrder === 'asc' ? 1 : -1;
            return 0;
            })
        },
        sortStocksByChange: (state, action: PayloadAction<'asc' | 'desc'>) => {
            state.stocks.sort((a, b) => action.payload === 'asc' ? parseFloat(a.change_amount) - parseFloat(b.change_amount) : parseFloat(b.change_amount) - parseFloat(a.change_amount))
        },
        sortStocksByPercentage: (state, action: PayloadAction<'asc' | 'desc'>) => {
            state.stocks.sort((a, b) => action.payload === 'asc' ? parseFloat(a.change_percentage) - parseFloat(b.change_percentage) : parseFloat(b.change_percentage) - parseFloat(a.change_percentage))
        },
        sortStocksBySymbolName: (state, action: PayloadAction<'asc' | 'desc'>) => {
            state.stocks.sort((a, b) => {
            if (a.company_symbol < b.company_symbol) return action.payload === 'asc' ? -1 : 1;
            if (a.company_symbol > b.company_symbol) return action.payload === 'asc' ? 1 : -1;
            return 0;
            })
        },
        toggleFavorite: (state, action: PayloadAction<string>) => {
            const index = state.stocks.findIndex(stock => stock.company_symbol === action.payload);
            state.stocks[index].isfavourite = !state.stocks[index].isfavourite
        },
        filterByPrice: (state, action: PayloadAction<{ min: number, max: number }>) => {
            state.stocks = state.stocks.filter(stock => parseFloat(stock.price) >= action.payload.min && parseFloat(stock.price) <= action.payload.max);
        },
        filterByChange: (state, action: PayloadAction<{ min: number, max: number }>) => {
            state.stocks = state.stocks.filter(stock => parseFloat(stock.change_amount) >= action.payload.min && parseFloat(stock.change_amount) <= action.payload.max);
        },
        filterByFavorite: (state) => {
            state.stocks = state.stocks.filter(stock => stock.isfavourite);
        },
        filterByChangePercentage: (state, action: PayloadAction<{ min: number, max: number }>) => {
            state.stocks = state.stocks.filter(stock => parseFloat(stock.change_percentage) >= action.payload.min && parseFloat(stock.change_percentage) <= action.payload.max);
        },
        },
        extraReducers: (builder) => {
        builder.addCase(fetchStocks.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchStocks.fulfilled, (state, action) => {
            state.loading = false
            state.stocks = action.payload.paginatedData
            state.totalPage = action.payload.totalPage
        })
        builder.addCase(fetchStocks.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || ''
        })
    }
})

export const { setStocks, sortStocksByPrice, sortStocksByName, sortStocksByChange, sortStocksByPercentage, sortStocksBySymbolName, toggleFavorite, filterByPrice, filterByChange, filterByFavorite, filterByChangePercentage } = stockSlice.actions

export default stockSlice.reducer