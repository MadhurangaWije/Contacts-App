import { configureStore } from '@reduxjs/toolkit'
import contactsReducer from './features/contacts/contactsSlice'
import { errorMiddleware } from './middleware/errorMiddleware'

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(errorMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 