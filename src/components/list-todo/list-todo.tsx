import React, { FC, useContext } from 'react';
import TaskListStyle from './list-todo.style';
import ITask from '../../utils/task';
import { Checkbox, FontIcon, MessageBar, PrimaryButton, Stack, mergeStyles } from '@fluentui/react';
import { TodoContext } from '../todo-provider/todo-provider';
import { ActionTypeEnum } from '../../utils/Types';
import TodoString from '../../utils/Strings.json'
import TodoDescription from '../todo-description/todo-description';

type Props = {
  setEditTask :(taskId:any)=>void
}
const ListTodo = ({setEditTask}:Props) => {
  const { activeTasks, dispatch } = useContext(TodoContext)

  const onTaskDelete = (id: any) => {
    if (window.confirm(TodoString.taskDeleteConfirmation)) {
      dispatch({ type: ActionTypeEnum.Delete, data: { id } })

    }


  }

  const onTaskCompleteToggle = (id: any) => {
    dispatch({ type: ActionTypeEnum.Complete, data: { id } })

  }
  const onAddNewTask=()=>{
    setEditTask("");

  }

  const onTaskEdit
= (id:any)=>{
 setEditTask(id);
}
  const onRenderCell = (task: ITask) => {
    return <Stack horizontal className={TaskListStyle.taskItem} key={task.id}>
      <Stack horizontal style={{ width: "85%" }}>
        <Checkbox onChange={() => onTaskCompleteToggle(task.id)} />
        {task.title}
      </Stack>
      <Stack horizontal style={{ width: "15%" }}>
      <TodoDescription task={task} />
        {/* <FontIcon iconName={task.status ? "FavoriteStarFill" : "FavoriteStar"} 
        className={task.status?mergeStyles(TaskListStyle.iconStyle,{color:"green"}):TaskListStyle.iconStyle} ></FontIcon> */}
        <FontIcon iconName='EditNote' className={TaskListStyle.iconStyle} onClick={() => setEditTask(task.id)}></FontIcon>
        <FontIcon iconName='Delete' className={TaskListStyle.iconStyle} onClick={() => onTaskDelete(task.id)}></FontIcon>

      </Stack>
    </Stack>

  }
  return (
    <Stack  >
      
      {activeTasks.length?activeTasks.map(onRenderCell):
     
     <div className={TaskListStyle.todoContainer}
     
     >
   <MessageBar>No Records to Show.</MessageBar>
   <PrimaryButton  text={TodoString.taskAdd} style={{margin: 20}} onClick={() => onAddNewTask()}></PrimaryButton>

      </div>
      
      
      }
    </Stack>
  );
}

export default ListTodo;
function dispatch(arg0: { type: ActionTypeEnum; data: { id: any; }; }) {
  throw new Error('Function not implemented.');
}

