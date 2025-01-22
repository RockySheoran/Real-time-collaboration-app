import { createSlice } from "@reduxjs/toolkit"




const allSlice  = createSlice({
    name:'all',
    initialState:{
        allUser:[],
        socket:null,
        Allcode:"",
        select:false,
        roomID :"",
    },
    reducers:{
        setAllUser :(state,action) =>{
            state.allUser = action.payload;
        },
        setSocket :(state,action) =>{
            state.socket = action.payload;
        },
        setCode :(state,action) =>{
            state.Allcode = action.payload;
        },
        
        setSelect :(state,action) =>{
            state.select = action.payload;
        },
        setRoomId: (state, action) => {
            state.roomID = action.payload;
        },
    }
})


export const { setAllUser, setSocket, setCode,setSelect,setRoomId } = allSlice.actions;

export default allSlice.reducer;