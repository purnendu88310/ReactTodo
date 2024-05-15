import React, { FC, useContext, useEffect, useState } from 'react';
import styles from './add-edit-todo.module.css';
import { MessageBar, MessageBarType, PivotItem, PrimaryButton, Stack, TextField } from '@fluentui/react';
import { TodoContext } from '../todo-provider/todo-provider';
import ITask from '../../utils/task';
import { ActionTypeEnum, PivotKeyEnum } from '../../utils/Types';
import TodoString from '../../utils/Strings.json'

type Props = {
  editTaskId: any,
  changeTab :(tab:any)=>void


}

const AddEditTodo = ({ editTaskId,changeTab }: Props) => {
  const { activeTasks, dispatch } = useContext(TodoContext)
  useEffect(() => {
    if (editTaskId) {
      const taskData = activeTasks.find(task => task.id === editTaskId)
      setTitle(taskData?.title || "");
      setDescription(taskData?.description || "");
    }

  }, [editTaskId]



  )
  const [showMessage, setShowMessage] = useState<{
    type: MessageBarType;
    message: string;
  }>({ type: MessageBarType.success, message: "" })
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const onTitleChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTitle(event.currentTarget.value)
  }
  const onDescriptionChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDescription(event.currentTarget.value)
  }

  const addTaskAction = () => {

    const data: ITask = { title: title, description: description, status: false, id: '0' }
    dispatch({ type: ActionTypeEnum.Add, data })
    setShowMessage({ type: MessageBarType.success, message: "Task Added" })
    setTitle("");
    setDescription("");
    setTimeout(() => {
      changeTab(PivotKeyEnum.Tasks)

     }, 1000);

  }
  const updateTaskAction = () => {
    const taskData = activeTasks.find(task => task.id === editTaskId)
    if(taskData){
     const data:ITask={
      title: title,
      description: description, 
      status: taskData.status,
      id: taskData.id

     };
     dispatch({type:ActionTypeEnum.Edit,data})
     setShowMessage({ type: MessageBarType.success, message: "Task Updated" })
     setTimeout(() => {
      changeTab(PivotKeyEnum.Tasks)

     }, 1000);

    }else{
      setShowMessage({ type: MessageBarType.error, message: "Error While Updating Task" })
  
    }

  }
  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    editTaskId ? updateTaskAction() : addTaskAction();
  };
  useEffect(() => {
    if (showMessage.message) {
      setTimeout(() => {
        setShowMessage({ type: MessageBarType.success, message: "" })

      }, 2000);
    }
  }, [showMessage.message])
  return (
    <form data-testid="AddEditTodo" onSubmit={onFormSubmit}>
      <TextField label='Title' required value={title} onChange={onTitleChange}></TextField>
      <TextField label='Description' multiline rows={5} required value={description} onChange={onDescriptionChange}></TextField>
      <Stack horizontal tokens={{ childrenGap: 20 }} style={{ marginTop: 20 }}>
        <Stack style={{ width: "80%" }}>
          {showMessage.message && (
            <MessageBar messageBarType={MessageBarType.success}>
              {showMessage.message}
            </MessageBar>
          )}

        </Stack>
        <Stack style={{ width: "20%" }}>

          <PrimaryButton type='submit' text={editTaskId ? TodoString.taskUpdate : TodoString.taskAdd}></PrimaryButton>

        </Stack>

      </Stack>

    </form>
  );
}

export default AddEditTodo;
