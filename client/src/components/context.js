/* eslint-disable no-undef */
import axios from "axios";
import React, { useContext,  useState} from "react";

const PageContext = React.createContext()



const AppProvider = ({children})=>{
    const[login,setLogin] = useState()
    const[errors, setError] = useState()
    const [user, setUser] = useState(false)
    const [refresh, setRefresh] = useState(true)
    const [loading, setLoading] = useState(true)
    const[reviews, setReview]=useState(false)
    const[Deletetour, setDelete] = useState(false)
    const[Deletingtour, setDeleting] = useState(false)
    const[edit, setEdit] = useState(false)
const[duplicateReview, setDuplicateReview] = useState(false)


    const Registration = async (name, email, password)=>{
     try {
        setError("")
        const response = await axios.post('http://localhost:4000/signup', {
            name:name,
            email:email,
            password:password
        });   
            localStorage.setItem('token',JSON.stringify(response.data.token));
            localStorage.setItem('user',JSON.stringify(response.data.user));
        setUser(true)
     } catch (error) {
        console.log(error.response.data.message);
        setError(error.response.data.message)
     }
    }

   async function ViewMore(id) {
    return localStorage.setItem("Dataid",JSON.stringify(id))
    }
    const token = JSON.parse(localStorage.getItem('token'))
    const users = JSON.parse(localStorage.getItem('user'))
    
    const ReviewWrite = async (review, rating, id)=>{
        console.log(review, rating, id);
        try {
            if (!id && !token) {
                return setLogin(true)
              }
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            
              const res = await axios.post( 
                    `http://localhost:4000/review/${id}`,
                    {
                      review,
                      rating,
                    },
                    config
                  )
                  setRefresh(!refresh)
            console.log(res)
        } catch(error){
            console.log(error)
            setDuplicateReview(true)
        }
        
       } 

       const EditReview = async (id, review, rating)=>{
        try {
            // setRefresh(true)
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
         const res = await axios.patch(`http://localhost:4000/review/${id}`,{
            review,
            rating
         }, config)
         console.log(res);
         setRefresh(!refresh)
         
        } catch (error) {
            console.log(error);
        }
       }
       const DeleteReview = async (id)=>{
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
         const res = await axios.delete(`http://localhost:4000/review/${id}`, config)
         console.log(res);
        } catch (error) {
            console.log(error);
        }
       }

       const DeleteTourData = async (id)=>{
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
         const res = await axios.delete(`http://localhost:4000/createdata/${id}`, config)
         console.log(res);
         localStorage.removeItem("Dataid")
         setDeleting(true)
        } catch (error) {
            console.log(error);
        }
       }
       

    return(
        <PageContext.Provider value={{
            Registration,
            user,
            setUser,
            ViewMore,
            loading,
            setLoading,
            reviews,
            setReview,
            ReviewWrite,
            login,
            setLogin,
            refresh,
            setRefresh,
            EditReview,
            token,
            users,
            DeleteReview,
            errors,
            Deletetour,
            setDelete,
            DeleteTourData,
            Deletingtour,
            edit, 
            setEdit,
            duplicateReview,
            setDeleting
            }}>{children}</PageContext.Provider>
    )
}

export const useGlobalContext = ()=>{
    return useContext(PageContext)
}

export{PageContext, AppProvider}