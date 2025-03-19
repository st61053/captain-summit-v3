import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../user/userSlice'
import questReducer from '../quest/questSlice'
import layoutReducer from '../layout/layoutSlice'


export const store = configureStore({
    reducer: {
        user: userReducer,
        quest: questReducer,
        layout: layoutReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch