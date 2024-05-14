import React, { FC, createContext, useReducer } from 'react';
import styles from './add-edit-todo.module.css';
import ITask from '../../utils/task';
import { ITodoContext } from '../../utils/todo-context';
import { ITodoState } from '../../utils/todo-state';
import { ActionTypeEnum } from '../../utils/Types';
import { IAddAction, IReducerAction } from '../../utils/action-task';
import { clone } from '../../utils/utility';

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
        
        return { ...state, activeTasks: [action.data, ...state.activeTasks] }
        
        case ActionTypeEnum.Delete:
            const activeTasks:ITask[] = JSON.parse(JSON.stringify(state.activeTasks))
           const filteredTask = activeTasks.filter((task)=>task.id!== action.data.id)
            return { ...state,activeTasks:filteredTask}
            case ActionTypeEnum.Complete:
                
                  const dataAll = completedTaskAction(state,action)
                    return {...state,
                        activeTasks:dataAll.filteredData,
                        completedTasks:dataAll.completedTask}
               case ActionTypeEnum.Edit:
                const cloneActiveTasksList:ITask[] = JSON.parse(JSON.stringify(state.activeTasks))
                const index = cloneActiveTasksList.findIndex((task)=>task.id == action.data.id)
                if(index>=0){
                    cloneActiveTasksList[index] = action.data
                  }
                  return { ...state,activeTasks:cloneActiveTasksList}

    }

    return { ...state }
}
const TodoProvider = (props: Props) => {
    const tasks: ITask[] = [{
        id: 1,
        title: "Task 1",
        description: "Task 1 Description",
        status: true
    },
    {
        id: 2,
        title: "Task 2",
        description: "Task 2 Description",
        status: false
    }]
    const data:ITodoState = { activeTasks: tasks,completedTasks:[] };
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

