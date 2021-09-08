import React, { useState } from "react";

export const TaskCreator = props =>{

    const[newTaskName, setNewTaskname] = useState('');

    const upadateNewTaskName = e => setNewTaskname(e.target.value);

    const createNewTask =()=>{
        props.callback(newTaskName);
        setNewTaskname('');
    };

    return(
        <div className="my-1">
            <input     
                type="text" 
                className="form-control"
                value={newTaskName}
                onChange={upadateNewTaskName}
            />
            <button className="btn btn-primary mt-1" onClick={createNewTask}>
                add
            </button>
        </div>
    )
}