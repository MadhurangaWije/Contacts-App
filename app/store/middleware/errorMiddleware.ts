import { Middleware } from '@reduxjs/toolkit'
import { isRejectedWithValue } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'

export const errorMiddleware: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    toast.error(
      action.payload?.message || 'An error occurred. Please try again.'
    )
  }

  return next(action)
} 