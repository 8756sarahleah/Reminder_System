import axios from '../utils/axios'
// נבצע את קריאות השרת service ב
 
//get
export const getMedicinesService = async () => {
    console.log("getMedicinesService ");
    const response = await axios.get("/Medicine");
    const medicines = response.data
    console.log(medicines);
    return medicines
}
