import React, { ReactElement, useState } from 'react';
import './App.css';
import AddWorkout from './Components/AddWorkout/AddWorkout';
import Calendar from './Components/Calendar/Calendar';
import AddExercise from './Components/AddExercise/AddExercise';
import AddWorkoutDay from './Components/AddWorkoutDay/AddWorkoutDay';
import Header from './Components/Header/header';
import { text } from './Constants/text';
import SelectActiveWorkout from './Components/SelectActiveWorkout/SelectActiveWorkout';
import Authentication from './Components/Authentication/Authentication';
import { UserProvider, useUser } from './Contexts/UserContext';

function AppComponent() {
  const [page, setPage] = useState<string>("");
  const { user } = useUser();

  const renderPage = (): ReactElement => {
    if (user.username !== "") {
      switch (page) {
        case text.ADD_EXERCISES:
          return <AddExercise />;
        case text.ADD_WORKOUT_DAYS:
          return <AddWorkoutDay />;
        case text.ADD_WORKOUTS:
          return <AddWorkout />;
        case text.SELECT_ACTIVE_WORKOUT:
          return <SelectActiveWorkout />
        default:
          return <Calendar />;
      }
    }
    else {
      return <Authentication />
    }

  };
  return (
    <div className="App">
        {user.username !== "" && <Header setPage={setPage} />}
        {renderPage()}
    </div>
  );
}

const App = () => {
  return (
    <UserProvider>
      <AppComponent />
    </UserProvider>
  )
}

export default App;
