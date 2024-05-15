import { ActionTypeEnum } from "./Types";
import ITask from "./task";
export type IReducerAction = IAddAction|IDeleteAction|IToggleStatus|ITaskUpdateAction|IDeleteCompleteAction

export interface IAddAction{
    type:ActionTypeEnum.Add,
    data:ITask
}
export interface IDeleteAction{
    type:ActionTypeEnum.Delete,
    data:{id:any}
}
export interface IToggleStatus{
    type:ActionTypeEnum.Complete,
    data:{id:any}
}
export interface ITaskUpdateAction{
    type:ActionTypeEnum.Edit,
    data:ITask
}
export interface IDeleteCompleteAction{
    type:ActionTypeEnum.DeleteCom,
    data:{id:any}
}