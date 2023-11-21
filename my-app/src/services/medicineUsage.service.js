import axios from '../utils/axios'

//get
export const getMedicineUsagesByIdService = async (id) => {
    console.log("getMedicineUsagesByIdService ");
    const response = await axios.get(`/MedicineUsage/${id}`);
    const medicineUsages = response.data
    console.log(medicineUsages);
    return medicineUsages
}

//post
export const addMedicineUsageService = async(newMedicineUsage) => {
    console.log("addMedicineUsageService ");
    const response=await axios.post("/MedicineUsage",newMedicineUsage);
    const medicineUsage=await response.data;
    return medicineUsage;
}

//delete
export const deleteMedicineUsageService = async (id) =>{
    console.log("deleteMedicineUsageService");
    const response = await axios.delete(`/MedicineUsage/${id}`)
    const medicineUsages = response.data
    return medicineUsages
}

//update
export const updateMedicineUsageService = async (id,medicineUsage) =>{
    console.log("updateMedicineUsageService");
    console.log(medicineUsage)
    const response = await axios.put(`/MedicineUsage/${id}`,medicineUsage)
    const medicineUsage_ = response.data
    return medicineUsage_
}