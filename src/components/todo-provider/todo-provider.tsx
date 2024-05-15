import React, { FC, createContext, useEffect, useReducer, useState } from 'react';
import ITask from '../../utils/task';
import { ITodoContext } from '../../utils/todo-context';
import { ITodoState } from '../../utils/todo-state';
import { ActionTypeEnum } from '../../utils/Types';
import { IReducerAction } from '../../utils/action-task';
import { clone } from '../../utils/utility';
import { handleSubmit } from '../../firebase/todo-firebase';
import { getActiveTaskList, getCompletedTaskList, saveActiveTaskList, saveCompletedTaskList } from '../../utils/storage.service';

interface TodoProviderProps { }
export const TodoContext = createContext<ITodoContext>({ activeTasks: [],
    completedTasks:[],
    dispatch: () => { } });
type Props = {
    children: React.ReactNode
}

const addTaskAction = (state: ITodoState, action: IReducerAction)=>{

}
const completedTaskAction=(state: ITodoState, action: IReducerAction)=>{
    const activeTasks:ITask[]=clone(state.activeTasks);
  
    const taskIndex = activeTasks.findIndex((task)=>task.id == action.data.id)
      if(taskIndex>=0){
        activeTasks[taskIndex].status = !activeTasks[taskIndex].status
      }
  
  
  
  
    const completedTaskData = activeTasks.find(
        (task)=>task.id === action.data.id
    );
    const filteredData = activeTasks.filter(
        (task)=>task.id !== action.data.id
    );


    const completedTask = completedTaskData?[completedTaskData, ...state.completedTasks]:
    [...state.completedTasks]
    return {
        filteredData,
        completedTask
    }
}
const reducer = (state: ITodoState, action: IReducerAction) => {
    switch (action.type) {
      
                     case ActionTypeEnum.Add: 
        const { data } = action;
        data.id = new Date().toJSON();
       // handleSubmit(data);
        const finalList = [action.data, ...state.activeTasks]
        saveActiveTaskList(finalList)

        return { ...state, activeTasks: [action.data, ...state.activeTasks] }
        
        case ActionTypeEnum.Delete:
            const activeTasks:ITask[] = JSON.parse(JSON.stringify(state.activeTasks))
           const filteredTask = activeTasks.filter((task)=>task.id!== action.data.id)
           saveActiveTaskList(filteredTask)

            return { ...state,activeTasks:filteredTask}
            case ActionTypeEnum.DeleteCom:
                const activeCompletedTasks:ITask[] = JSON.parse(JSON.stringify(state.completedTasks))
                const filteredCompletedTask = activeCompletedTasks.filter((task)=>task.id!== action.data.id)
                saveCompletedTaskList(filteredCompletedTask)
     
                 return { ...state,completedTasks:filteredCompletedTask}  
            case ActionTypeEnum.Complete:
                
                  const dataAll = completedTaskAction(state,action)
                  saveActiveTaskList(dataAll.filteredData)
                  saveCompletedTaskList(dataAll.completedTask)
          
                    return {...state,
                        activeTasks:dataAll.filteredData,
                        completedTasks:dataAll.completedTask}
               case ActionTypeEnum.Edit:
                const cloneActiveTasksList:ITask[] = JSON.parse(JSON.stringify(state.activeTasks))
                const index = cloneActiveTasksList.findIndex((task)=>task.id == action.data.id)
                if(index>=0){
                    cloneActiveTasksList[index] = action.data
                  }
                  saveActiveTaskList(cloneActiveTasksList)

                  return { ...state,activeTasks:cloneActiveTasksList}
                  
              

    }

    return { ...state }
}
 
const TodoProvider = (props: Props) => {
     const tasks: ITask[] = getActiveTaskList();
     const completedTasks:ITask[] = getCompletedTaskList();
    const data:ITodoState = { activeTasks: tasks,completedTasks:completedTasks };
    const [state, dispatch] = useReducer(reducer, data);
    
    return (
        <TodoContext.Provider value={{ activeTasks: state.activeTasks,completedTasks:state.completedTasks, dispatch }}>
            {props.children}
        </TodoContext.Provider>
    );
}

export default TodoProvider;
function userReducer(reducer: (state: any, action: any) => any, tasks: ITask[]): [any, any] {
    throw new Error('Function not implemented.');
}

