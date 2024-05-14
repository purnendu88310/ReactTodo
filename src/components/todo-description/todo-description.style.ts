import { IProcessedStyleSet, IStyle, mergeStyleSets } from "@fluentui/react";


interface ITaskListStyle{
    iconStyle:IStyle
}


const TaskDescriptionStyle:IProcessedStyleSet<ITaskListStyle> = mergeStyleSets({
    
    iconStyle:{
        fontSize:20,
        margin:'0 3px',
        selectors:{
            "&:hover":{cursor:"pointer"}
           }
    }

})
export default TaskDescriptionStyle;