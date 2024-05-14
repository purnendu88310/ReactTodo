import { Dispatch } from "react";
import ITask from "./task";

export interface ITodoContext{
activeTasks:ITask[]
completedTasks:ITask[]
dispatch:Dispatch<any>

}