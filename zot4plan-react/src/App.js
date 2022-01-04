import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {data} from './assets/data';
import {useState} from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import required_ics from './assets/icsrequirements';

function App() {

  let courseArray = required_ics
  let initialCourse = {}

  courseArray.map((item) => {
    if(item[1] && data.hasOwnProperty([item[0]])) 
        initialCourse[item[0]] = data[item[0]];
  })

  console.log(initialCourse)

  return (
  <DndProvider backend={HTML5Backend}>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage initialCourses={initialCourse}/>}></Route>
        <Route path="/home" element={<HomePage initialCourses={initialCourse}/>}></Route>
        <Route path="/about" element={<AboutPage/>}></Route>
      </Routes>
    </BrowserRouter>
  </DndProvider>
  );
}

export default App;
