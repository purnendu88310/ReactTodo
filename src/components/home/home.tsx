import React, { FC, createContext, useState } from 'react';
import HomeStyle from './home.style';
import TodoString from '../../utils/Strings.json'
import { Pivot, PivotItem, PrimaryButton, Stack, initializeIcons } from '@fluentui/react';
import { PivotKeyEnum } from '../../utils/Types';
import ListTodo from '../list-todo/list-todo';
import ITask from '../../utils/task';
import TodoProvider from '../todo-provider/todo-provider';
import AddEditTodo from '../add-edit-todo/add-edit-todo';
import ListCompletedTodo from '../list-todo/list-todo-completed';

initializeIcons();
export const TodoContext = createContext<{ activeTasks:  ITask[] }>({activeTasks:[]});

interface HomeProps {}

const Home: FC<HomeProps> = () => {
const [selectedKey,setSelectedKey] = useState<string>(PivotKeyEnum.Tasks)
const [editTaskId,setEditTaskId] = useState<any | null>(null)

const editTask = (id:any)=>{
  if(id=='list'){
    setEditTaskId("")
    setSelectedKey(PivotKeyEnum.Tasks)
  }else{
    setEditTaskId(id)
    setSelectedKey(PivotKeyEnum.TaskForm)
  }
  
}
const changeTab = (tab:any)=>{
  setSelectedKey(tab)
  
  
}
 return( <Stack className={HomeStyle.todoContainer} data-testid="Home">
   <TodoProvider>
   <header className={HomeStyle.headerStyle}>
      <h2>{TodoString.header}</h2>
    </header>
    <Stack  className={HomeStyle.mt20}>
    <Pivot 
    selectedKey={String(selectedKey)}
    styles={{root:HomeStyle.pivotRoot}}
    onLinkClick={(item?:PivotItem)=>{
      if(item?.props.itemKey != PivotKeyEnum.TaskForm){
        setEditTaskId(null)
      }
      setSelectedKey(item?.props.itemKey||PivotKeyEnum.Tasks);
    }}>
 <PivotItem headerText={PivotKeyEnum.Tasks} itemKey={PivotKeyEnum.Tasks}>
    <ListTodo setEditTask={editTask}></ListTodo>

 </PivotItem>
 <PivotItem headerText={PivotKeyEnum.TaskForm} itemKey={PivotKeyEnum.TaskForm}>
    <AddEditTodo editTaskId={editTaskId} changeTab={changeTab}></AddEditTodo>

 </PivotItem>
 <PivotItem headerText={PivotKeyEnum.Completed} itemKey={PivotKeyEnum.Completed}>
    <ListCompletedTodo></ListCompletedTodo>
    

 </PivotItem>

    </Pivot>

    </Stack>
    </TodoProvider>

  </Stack>)
}

export default Home;
