import React from 'react';
import Form from './pages/Form/Form';
import Navbar from './components/Navbar/Navbar';
import UserList from './pages/ListData/UserList';
import {
    Routes,
    Route
} from "react-router-dom";

function App() {
    return (
        <div className='app'>
            <Navbar />
            <Routes>
                <Route path='/' element={<Form />} />
                <Route path='/list' element={<UserList />} />
            </Routes>
        </div>
    );
}

export default App;