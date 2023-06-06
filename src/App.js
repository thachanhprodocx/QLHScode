import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import AccountList from './components/AccountList';
import ClassList from './components/ClassList';
import ClassRoomList from './components/ClassRoomList';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/account" element={<AccountList  />} />
        <Route path="/class" element={<ClassList />} />
        <Route path="/classroom" element={<ClassRoomList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
