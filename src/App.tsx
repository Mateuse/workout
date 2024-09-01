import React, { ReactElement, useState } from 'react';
import './App.css';
import AddWorkout from './Components/AddWorkout/AddWorkout';
import Calendar from './Components/Calendar/Calendar';
import AddExercise from './Components/AddExercise/AddExercise';
import AddWorkoutDay from './Components/AddWorkoutDay/AddWorkoutDay';
import Header from './Components/Header/header';
import { text } from './Constants/text';

function App() {
  const [page, setPage] = useState<string>("");

  const renderPage = (): ReactElement => {
    switch(page) {
        case text.ADD_EXERCISES:
            return <AddExercise />;
        case text.ADD_WORKOUT_DAYS:
            return <AddWorkoutDay />;
        case text.ADD_WORKOUTS:
            return <AddWorkout />;
        default:
            return <Calendar />;
    }
};
  return (
    <div className="App">
      <Header setPage={setPage}/>
      {renderPage()}
    </div>
  );
}

export default App;
