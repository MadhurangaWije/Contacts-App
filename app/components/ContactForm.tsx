const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  
  if (!formData.name.trim()) {
    toast.error('Name is required')
    return
  }
  
  if (!formData.email.trim()) {
    toast.error('Email is required')
    return
  }
  
  if (!isValidEmail(formData.email)) {
    toast.error('Please enter a valid email address')
    return
  }
  
  onSubmit(formData)
} 