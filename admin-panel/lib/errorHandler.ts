import { toast } from 'sonner'

export const handleApiError = (error: any) => {
  if (!error.response) {
    toast.error('Network error. Please check your connection.')
    return
  }

  const { status, data } = error.response

  // Unauthorized → redirect to login
  if (status === 401) {
    toast.error('Session expired. Please login again.')
    window.location.href = '/login'
    return
  }

  // Forbidden
  if (status === 403) {
    toast.error(data?.message || 'You are not allowed to perform this action.')
    return
  }

  // Not Found
  if (status === 404) {
    toast.error(data?.message || 'Resource not found.')
    return
  }

  // Validation
  if (status === 400) {
    toast.error(data?.message || 'Invalid request.')
    return
  }

  // Server Error
  if (status >= 500) {
    toast.error('Server error. Please try again later.')
    return
  }

  toast.error(data?.message || 'Something went wrong.')
}