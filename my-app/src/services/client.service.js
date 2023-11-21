import axios from '../utils/axios'
// נבצע את קריאות השרת service ב
 
//get
export const getClientsService = async () => {
    console.log("getClientsService ");
    const response = await axios.get("/Client");
    const clients = response.data
    console.log(clients);
    return clients
}

//post
export const addClientService=async(newClient) => {
    console.log("addClientService ");
    const response=await axios.post("/Client",newClient);
    const client=await response.data;
    return client;

}

//update
export const updateClientService = async (id,client) =>{
    console.log("updateClientService");
    const response = await axios.put(`/Client/${id}`,client)
    const client_ = response.data
    console.log(client_);
    return client_
}
