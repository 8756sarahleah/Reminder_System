
import {addMedicineUsageService,getMedicineUsagesByIdService,deleteMedicineUsageService,updateMedicineUsageService} from '../../services/medicineUsage.service'
import {addMedicineUsage,setMedicineUsages,deleteMedicineUsage,updateMedicineUsage} from '../slices/auth.slice'


// get
export const getMedicineUsageByIdThunk = (id) => {
    console.log("getMedicineUsageByIdThunk");
    return async (dispatch) => {
        const medicineUsages = await getMedicineUsagesByIdService(id);
        dispatch(setMedicineUsages(medicineUsages))// מבצע את הפעולה שברדוסר
        return medicineUsages
    }
}



//add
export const addMedicineUsageThunk = (newMedicineUsage) => {
    console.log("addMedicineUsageThunk ")
       return async (dispatch) => {
        const medicineUsage = await addMedicineUsageService(newMedicineUsage)
        dispatch(addMedicineUsage(medicineUsage))
        return medicineUsage;
    }
}

//delete
export const deleteMedicineUsageThunk = (id)=>{
    console.log("deleteMedicineUsageThunk");
    return async (dispatch)=>{
        await deleteMedicineUsageService(id);
        await dispatch(deleteMedicineUsage(id));
        
    }
}


//update
export const updateMedicineUsageThunk = (id,medicineUsage)=>{
    console.log("updateMedicineUsageThunk");
    return async (dispatch)=>{
        const medU= await updateMedicineUsageService(id,medicineUsage);
        await dispatch(updateMedicineUsage({id:id,medicineUsage:medU}));
    }
}
