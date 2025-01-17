import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Password: '',
    confirmPassword: '' // Added confirm password field
  })

  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false) // Loading state to disable button
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value 
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Check if passwords match
    if (formData.Password !== formData.confirmPassword) {
      setMessage('Passwords do not match.')
      return
    }

    // Basic email format validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    if (!emailPattern.test(formData.Email)) {
      setMessage('Please enter a valid email address.')
      return
    }

    // Basic password length validation
    if (formData.Password.length < 8) {
      setMessage('Password must be at least 8 characters long.')
      return
    }

    setIsLoading(true)
    setMessage('')

    fetch('http://localhost:5800/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Name: formData.Name,
        Email: formData.Email,
        Password: formData.Password
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Registration failed'); // Catch failed responses
        }
        return response.json();
      })
      .then(data => {
        setMessage('Registration successful! Please log in.')
        setTimeout(() => {
          navigate('/login') // Redirect to login after successful registration
        }, 2000)
      })
      .catch(error => {
        setMessage('Registration failed. Please try again.')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md p-8 space-y-8 rounded-xl shadow-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Create your account</h2>
          <p className="mt-2 text-sm text-gray-400">Join us and start your journey</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="Name" className="block text-sm font-medium text-white">Name</label>
              <input
                id="Name"
                name="Name"
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7a56d6] bg-black opacity-90 text-white"
                placeholder="Name"
                value={formData.Name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="Email" className="block text-sm font-medium text-white">Email address</label>
              <input
                id="Email"
                name="Email"
                type="email"
                required
                className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7a56d6] bg-black opacity-90 text-white"
                placeholder="Email address"
                value={formData.Email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="Password" className="block text-sm font-medium text-white">Password</label>
              <input
                id="Password"
                name="Password"
                type="password"
                required
                className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7a56d6] bg-black opacity-90 text-white"
                placeholder="Password"
                value={formData.Password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="w-full px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7a56d6] bg-black opacity-90 text-white"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#7a56d6] hover:bg-[#7a56d6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fa4d56] transition duration-150 ease-in-out"
              disabled={isLoading} // Disable the button while loading
            >
              {isLoading ? 'Signing up...' : 'Sign up'}
            </button>
          </div>
        </form>

        {message && (
          <div className="mt-4 text-center text-sm font-medium text-green-500">
            {message}
          </div>
        )}

        <div className="text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="../login" className="font-medium text-[#7a56d6] hover:text-[#fa4d56] transition duration-150 ease-in-out">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
