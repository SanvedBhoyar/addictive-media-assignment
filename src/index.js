import React from 'react';
import ReactDom from 'react-dom';
import './index.css';
import Root from './App';
import ErrorPage from './pages/ErrorPage/error-page';
import UserList from './pages/ListData/UserList';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/list",
                element: <UserList />
            },
        ],
    },
]);

const root = ReactDom.createRoot(document.querySelector('#root'));

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);