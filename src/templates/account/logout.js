import React from 'react';
import { Redirect } from 'react-router-dom';
import { postAPI } from '../service/api';
const logout = ()=>{
    return postAPI('/logout')
}
function Logout(){
    localStorage.removeItem("token");
    React.useEffect(()=>{
        const Logout = async()=>{
            try {
                const rs = await logout();
                if( rs.status === 200){
                    console.log(rs);
                }
            } catch (error) {
                
            }
        };
        Logout();
    },[]);
    return(
        <Redirect to = '/'/>
    );
}
export default Logout;