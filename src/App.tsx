import React from 'react';
import './App.css';
import AddWorkout from './Components/AddWorkout/AddWorkout';
import AddExercise from './Components/AddExercise/AddExercise';
import Exercises from './Components/Exercises/Exercises';
import AddWorkoutDay from './Components/AddWorkoutDay/AddWorkoutDay';
// import Calendar from './Components/Calendar/Calendar';

function App() {
  return (
    <div className="App">
      {/* <Calendar /> */}
     <AddWorkout />
      {/* <AddExercise /> */}
    {/* <AddWorkoutDay />u */}
    </div>
  );
}

export default App;
