import React, { FC } from 'react';
import styles from './todo-description.module.css';
import { FontIcon, TeachingBubble } from '@fluentui/react';
import { useId,useBoolean } from '@fluentui/react-hooks';

import TaskListStyle from '../list-todo/list-todo.style';
import ITask from '../../utils/task';

type Props = {
  task :ITask
}

const TodoDescription = ({task}:Props) => {
  
  const buttonId = useId("targetButton");
  const [teachingBubbleVisible,{toggle:toggleTeachingBubbleVisible}] = useBoolean(false);
  return (
  <div  data-testid="TodoDescription">
        <FontIcon id={buttonId} iconName='Info' 
        className={TaskListStyle.iconStyle}
        onClick={toggleTeachingBubbleVisible}></FontIcon>
   {teachingBubbleVisible&&

<TeachingBubble
target={`#${buttonId}`}
headline={task.title}

>
  {task.description}
</TeachingBubble>
   }
  </div>
);}

export default TodoDescription;
