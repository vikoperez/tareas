import React, { useEffect, useState } from "react";
import {TaskRow} from './components/TaskRow'
import {TaskBanner} from './components/TaskBanner'
import {TaskCreator} from './components/TaskCreator'
import {VisibilityControl} from "./components/VisibilityControl"
// import {Names} from "./components/Names"

function App() {

  const [userName, setUserName] = useState("yolo");
  const [taskItems, setTaskItems] = useState([
  ]);

  const [showCompleted, setShowCompleted] = useState(true)

  useEffect(()=>{
    let data = localStorage.getItem('task');
    if(data != null){
      setTaskItems(JSON.parse(data));
    }else{
      setUserName('vico Example')
      setTaskItems([
        { name: 'Task One example', done: false },
        { name: 'Task Two example', done: false },
        { name: 'Task Three example', done: false },
        { name: 'Task Four example', done: false },
      ])
    }
  },[]);

  useEffect (() =>{
    localStorage.setItem('task', JSON.stringify(taskItems));
  }, [taskItems]);

  const createNewTask = taskName =>{
    if(!taskItems.find(t => t.name === taskName)) {
      setTaskItems([...taskItems, {name: taskName, done: false}])
    }
  }

  const toggleTask =task =>
   setTaskItems(taskItems.map(t => (t.name === task.name ? {...t, done: !t.done}:t)))

  const taskTableRows = (doneValue) => (
    taskItems
    .filter(task => task.done ===doneValue)
    .map(task =>(
      <TaskRow task={task} key={task.name} toggleTask={toggleTask}/>
    ))
  )

  return (
    <div className="App">    

      <TaskBanner userName={userName} taskItems={taskItems}/>

      <TaskCreator callback={createNewTask}/>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Description</th>
            <th>Done</th>
          </tr>
        </thead>

        <tbody>
          {taskTableRows(false)}
        </tbody>
      </table>

    <div className="bg-secondary-text-white text-center p-2">
      <VisibilityControl
        description= "completed task"
        isChecked={showCompleted}
        callback={checked => setShowCompleted(checked)}
      />
    </div>

    {
      showCompleted && (
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Description</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>
            {taskTableRows(true)}
          </tbody>
        </table>
      )
    }
      
    </div>
  );
}

export default App;
