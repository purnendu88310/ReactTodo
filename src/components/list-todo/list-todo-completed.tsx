import React, { FC, useContext } from 'react';
import TaskListStyle from './list-todo.style';
import ITask from '../../utils/task';
import { Checkbox, FontIcon, MessageBar, Stack, mergeStyles } from '@fluentui/react';
import { TodoContext } from '../todo-provider/todo-provider';
import { ActionTypeEnum } from '../../utils/Types';
import TodoString from '../../utils/Strings.json'
import TodoDescription from '../todo-description/todo-description';


const ListCompletedTodo = () => {
  const { completedTasks, dispatch } = useContext(TodoContext)

  const onTaskDelete = (id: any) => {
    if (window.confirm(TodoString.taskDeleteConfirmation)) {
      dispatch({ type: ActionTypeEnum.Delete, data: { id } })

    }


  }

  const onTaskCompleteToggle = (id: any) => {
    dispatch({ type: ActionTypeEnum.Complete, data: { id } })

  }

 
  const onRenderCell = (task: ITask) => {
    return <Stack horizontal className={TaskListStyle.taskItem} key={task.id}>
      <Stack horizontal style={{ width: "90%" }} className={TaskListStyle.disabled}>
        <Checkbox disabled />
        <span style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>{task.title}</span>
      </Stack>
      <Stack horizontal style={{ width: "10%" }}>
      <TodoDescription task={task} />

        <FontIcon iconName='Delete' className={TaskListStyle.iconStyle} onClick={() => onTaskDelete(task.id)}></FontIcon>

      </Stack>
    </Stack>

  }
  return (
    <Stack  >
      
      {completedTasks.length?completedTasks.map(onRenderCell):
      <MessageBar>No Records to Show.</MessageBar>
      
      
      
      }
</Stack>    
  );
}

export default ListCompletedTodo;
function dispatch(arg0: { type: ActionTypeEnum; data: { id: any; }; }) {
  throw new Error('Function not implemented.');
}

