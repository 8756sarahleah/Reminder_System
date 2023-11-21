import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react-dom/test-utils'

// סליס השומר את פרטי הלקוח הנוכחי
export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        id: 0,
        user: undefined,
        medicineUsages:undefined
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
            state.id=action.payload.id
        },
        updateUser:(state,action)=>{
            state.user=action.payload;
        },
        setMedicineUsages:(state,action)=>{
            state.medicineUsages=action.payload
        },
        addMedicineUsage:(state,action)=>{
            if(state.medicineUsages===undefined){
                state.medicineUsages=[];
            }
            state.medicineUsages.push(action.payload)
        },
        deleteMedicineUsage:(state,action)=>{
            state.medicineUsages= state.medicineUsages.filter(mu=>mu.id!==action.payload)
        } ,
        updateMedicineUsage:(state,action)=>{
            const index=state.medicineUsages.findIndex(m=>m.id==action.payload.id);
            state.medicineUsages[index]=action.payload.medicineUsage;
        }  
        
    }
})

export const { setUser,updateUser,setMedicineUsages,addMedicineUsage,deleteMedicineUsage,updateMedicineUsage} = authSlice.actions