
import axios from '../../utils/axios'
import { setMedicines } from '../slices/medicine.slice'


// get
export const getMedicinesThunk = () => {
    console.log("getMedicinesThunk")
    return async (dispatch) => {
        const response = await axios.get("/Medicine");
        const medicines = response.data
        dispatch(setMedicines(medicines))// מבצע את הפעולה שברדוסר
        return medicines
    }
}