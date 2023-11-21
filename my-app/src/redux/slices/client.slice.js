
import { createSlice } from '@reduxjs/toolkit'

export const clientSlice = createSlice({
    name: 'clients',
    initialState: {
        clients: undefined,
    },
    reducers: {
        addClient: (state, action) => {
            if(state.clients !== undefined){
                state.clients.push(action.payload)
            }
        },
        setClients: (state, action) => {
            state.clients = action.payload
        }
    }
})

export const { setClients, addClient } = clientSlice.actions