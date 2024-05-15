
export const getActiveTaskList = ()=>{
    const list = localStorage.getItem("active-tasks");
    if(list){
     return   JSON.parse(list);

    }else{
        return[]
    }
}    
export const getCompletedTaskList = ()=>{
    const list = localStorage.getItem("completed-tasks");
    if(list){
     return   JSON.parse(list);

    }else{
        return[]
    }
} 
export const saveActiveTaskList = (data:any)=>{
     localStorage.setItem("active-tasks",JSON.stringify(data));
    
} 
export const saveCompletedTaskList = (data:any)=>{
    localStorage.setItem("completed-tasks",JSON.stringify(data));
   
} 