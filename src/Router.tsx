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
    {
        path: `235777a0-b43d-44bd-930f-a2b919e05608`,
        element: <Quest questKey={"235777a0-b43d-44bd-930f-a2b919e05608"} />
    },
    {
        path: `ce480892-7b7b-4f04-b4a3-868ce85fb1b9`,
        element: <Quest questKey={"ce480892-7b7b-4f04-b4a3-868ce85fb1b9"} />
    },
    {
        path: `887c6822-4383-4456-a7c8-f6d74f6f147e`,
        element: <Quest questKey={"887c6822-4383-4456-a7c8-f6d74f6f147e"} />
    },
    {
        path: `3638772b-ee53-4521-8490-8eceb6a239e4`,
        element: <Quest questKey={"3638772b-ee53-4521-8490-8eceb6a239e4"} />
    },
    {
        path: `54b92df2-e307-403c-9e5e-ffffb19ba4ce`,
        element: <Quest questKey={"54b92df2-e307-403c-9e5e-ffffb19ba4ce"} />
    },
    {
        path: `ac6e1a5a-5c87-4fdc-bc97-77888727b343`,
        element: <Quest questKey={"ac6e1a5a-5c87-4fdc-bc97-77888727b343"} />
    },
    {
        path: `173eb597-b63d-44eb-8cb3-532ce14463d2`,
        element: <Quest questKey={"173eb597-b63d-44eb-8cb3-532ce14463d2"} />
    },
    {
        path: `a633cbf9-fd14-463c-bc42-d4ee2e73b6e7`,
        element: <Quest questKey={"a633cbf9-fd14-463c-bc42-d4ee2e73b6e7"} />
    },
    {
        path: `3b300ea8-4ec5-423d-a98f-9c5e9a8a6315`,
        element: <Quest questKey={"3b300ea8-4ec5-423d-a98f-9c5e9a8a6315"} />
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