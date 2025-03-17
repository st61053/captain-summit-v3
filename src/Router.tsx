import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MapContainer from './map/MapContainer';
import TaskList from './quest/components/TaskList';
import Leaderboard from './user/components/Leaderboard';
import Quest from './quest/components/Quest';

const menuRoutes = [
    {
        path: "/map",
        element: <MapContainer />
    },
    {
        path: "/task-list",
        element: <TaskList />
    },
    {
        path: "/leaderboard",
        element: <Leaderboard />
    },
    {
        path: `a567c6b3-23df-416c-a507-0ac06a46246b`,
        element: <Quest questKey={"a567c6b3-23df-416c-a507-0ac06a46246b"} />
    },
];

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<MapContainer />} />
            {
                menuRoutes.map((route, i) => (
                    <Route key={`route_${i}`} path={route.path} element={route.element} />
                ))
            }
        </Routes>
    )
}

export default Router