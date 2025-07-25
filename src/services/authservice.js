import axios_ from "../Api/axios";
const USER_API="users"
export const signup=async(user)=> {
return await axios_.post(USER_API + "/register",user);
}
export const signin=async(user)=> {
return await axios_.post(USER_API+"/login", user);
}