import React from 'react'
import { Routes, Route, HashRouter } from 'react-router-dom'
import MapContainer from './map/MapContainer';
import TaskList from './quest/components/TaskList';
import Leaderboard from './user/components/Leaderboard';
import Quest from './quest/components/Quest';
// import Quest from './features/map/Quest';
// import Map from './features/map/Map';

const routes = [
    // {
    //     path: `/a567c6b3-23df-416c-a507-0ac06a46246b`,
    //     element: <Quest questKey={"a567c6b3-23df-416c-a507-0ac06a46246b"} />
    // },
    // {
    //     path: `/174d3bcc-18ff-4b74-a735-3e4771d95a54`,
    //     element: <Quest questKey={"174d3bcc-18ff-4b74-a735-3e4771d95a54"} />
    // },
    // {
    //     path: `/368b6fda-944a-4a44-b1b7-0d213aab4a98`,
    //     element: <Quest questKey={"368b6fda-944a-4a44-b1b7-0d213aab4a98"} />
    // },
    // {
    //     path: `/e70f4091-17c8-4522-b991-d40cdabfc10f`,
    //     element: <Quest questKey={"e70f4091-17c8-4522-b991-d40cdabfc10f"} />
    // },
    // {
    //     path: `/09b6517f-6e9c-459f-bde3-886cb3b4c727`,
    //     element: <Quest questKey={"09b6517f-6e9c-459f-bde3-886cb3b4c727"} />
    // },
    // {
    //     path: `/110eb883-c4e8-47de-9eb5-617902c43844`,
    //     element: <Quest questKey={"110eb883-c4e8-47de-9eb5-617902c43844"} />
    // },
    // {
    //     path: `/80f8ebc8-2ada-4e9a-af52-ed2aefab0b1f`,
    //     element: <Quest questKey={"80f8ebc8-2ada-4e9a-af52-ed2aefab0b1f"} />
    // },
    // {
    //     path: `/5d8afb17-30c8-4879-9d6b-ec4b5e050a77`,
    //     element: <Quest questKey={"5d8afb17-30c8-4879-9d6b-ec4b5e050a77"} />
    // },
    // {
    //     path: `/5fba0118-b63d-41b8-9087-db6a90da030c`,
    //     element: <Quest questKey={"5fba0118-b63d-41b8-9087-db6a90da030c"} />
    // },
    // {
    //     path: `/6439db03-4ad3-4f0a-a450-62f2adf430cd`,
    //     element: <Quest questKey={"6439db03-4ad3-4f0a-a450-62f2adf430cd"} />
    // },
    // {
    //     path: `/465fcf38-799f-49ca-962b-83ddb56591d9`,
    //     element: <Quest questKey={"465fcf38-799f-49ca-962b-83ddb56591d9"} />
    // },
    // {
    //     path: `/bf1f23a5-94d3-4a93-a816-4c99f7bde099`,
    //     element: <Quest questKey={"bf1f23a5-94d3-4a93-a816-4c99f7bde099"} />
    // },
    // {
    //     path: `/0c542e8d-0ee4-48a8-a4d1-2fae5d714b30`,
    //     element: <Quest questKey={"0c542e8d-0ee4-48a8-a4d1-2fae5d714b30"} />
    // },
    // {
    //     path: `/e34dd8ba-b127-4888-ac0b-1a277cf94d95`,
    //     element: <Quest questKey={"e34dd8ba-b127-4888-ac0b-1a277cf94d95"} />
    // },
    // {
    //     path: `/f08b0af5-065a-4152-b20b-7ec3f80da0bc`,
    //     element: <Quest questKey={"f08b0af5-065a-4152-b20b-7ec3f80da0bc"} />
    // },
];

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
            <Route path="/:id" element={<Quest />} />
        </Routes>
    )
}

export default Router