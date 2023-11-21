
import { addClient  , setClients } from '../slices/client.slice';
import { setUser ,updateUser} from '../slices/auth.slice';
import { getClientsService, addClientService ,updateClientService} from '../../services/client.service'


// get
export const getClientsThunk = () => {
    console.log("getClientsThunk ");
    return async (dispatch) => {
        const clients = await getClientsService();
        dispatch(setClients(clients))// מבצע את הפעולה שברדוסר
    }
}

//add
export const addClientThunk = (newClient) => {
    console.log("addClientThunk ")
    return async (dispatch) => {
        const client = await addClientService(newClient)
        dispatch(addClient(client))
        dispatch(setUser(client))
        return client;
    }
}


//update
export const updateClientThunk = (id,client)=>{
    console.log("updateClientThunk");
    return async (dispatch)=>{
        const client_= await updateClientService(id,client);
        console.log(client_);
        await dispatch(updateUser(client_));
    }
}