export const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/signout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })

      if (!response.ok) {
        throw new Error(`Logout failed: ${response.statusText}`)
      }

      window.location.href = '/login' // Redirect to login page after successful logout
    } catch (error) {
      console.error('Logout error:', error)
    }
  }