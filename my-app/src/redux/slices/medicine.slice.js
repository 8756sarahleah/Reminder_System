import { createSlice } from '@reduxjs/toolkit'

export const medicineSlice = createSlice({
    name: 'medicines',
    initialState: {
        medicines: undefined
    },
    reducers: {
         setMedicines: (state, action) => {
            state.medicines = action.payload
        }
    }
})

export const { setMedicines } = medicineSlice.actions