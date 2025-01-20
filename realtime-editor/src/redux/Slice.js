import { createSlice } from "@reduxjs/toolkit"




const allSlice  = createSlice({
    name:'all',
    initialState:{
        allUser:[],
        socket:null,
        code:""
    },
    reducers:{
        setAllUser :(state,action) =>{
            state.allUser = action.payload;
        },
        setSocket :(state,action) =>{
            state.socket = action.payload;
        },
        setCode :(state,action) =>{
            state.code = action.payload;
        },
    }
})


export  const { setAllUser,setSocket} = allSlice.actions;

export default allSlice.reducer;