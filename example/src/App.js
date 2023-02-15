import React from 'react';
import './App.css';
import MyLibrary from "vertical-stepper";
function App() {
  const myLibraryInstance = new MyLibrary();
  console.log("myLibraryInstance", myLibraryInstance);
  myLibraryInstance.myMethod();
  return (
    <>
    <div className="App">
     <h1>Hello World!</h1>
    </div>
    </>
  );
}

export default App;
