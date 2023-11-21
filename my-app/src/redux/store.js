import { configureStore } from '@reduxjs/toolkit'
import { clientSlice } from './slices/client.slice';
import { authSlice } from './slices/auth.slice';
import {medicineSlice} from './slices/medicine.slice'


const store = configureStore({
    reducer: {
        clients: clientSlice.reducer,
        auth: authSlice.reducer,
        medicines:medicineSlice.reducer
    }
})

export default store;