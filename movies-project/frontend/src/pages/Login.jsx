// State in react is just data. Every time data is altered, it's state is changed by react 
// to reflect the change in data

import {useState, useEffect} from 'react'
import { FaSignInAlt } from 'react-icons/fa'

function Login() {
  // useState is a React Hook that creates a state variable, formData, and a function to alter the state, setFormData
  const [formData, setFormData] = useState({
    email: '',
    passowrd: '',
  })

  const { email, password } = formData

  // This function takes in event e, and alters the state of the target whose name attribute is changed
  // ...prevState ensures everything else remains the same
  const onChange = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
    }))
  }

  // Implementation not set yet, so this is set as default
  // It prevents HTML from reloading the page, so basically ensures button does nothing
  const onSubmit = (e) => {
    e.preventDefault()
  }
  
  return <>
    <section className='heading'>
        <h1>
            <FaSignInAlt /> Login
        </h1>
        <p>Login to your account </p>
    </section>

    <section className='form'>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <input type="text" className="form-control" id='email' name='email' 
                    value={email} placeholder='Enter your email' onChange={onChange}/>
            </div>
            <div className="form-group">
                <input type="text" className="form-control" id='password' name='password' 
                    value={password} placeholder='Enter your password' onChange={onChange}/>
            </div>an
            <div className="form-group">
                <button type='submit' className='btn btn-block'>
                    Submit
                </button>
            </div>
        </form>
    </section>
  </>
}

export default Login