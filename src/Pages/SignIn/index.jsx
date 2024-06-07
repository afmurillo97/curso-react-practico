import { useContext, useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCartContext } from '../../Context'
import Layout from '../../Components/Layout'

function SignIn() {

  const { 
    users,
    userSelected, 
    setUserSelected,
    message,
    setMessage,
    isValidUser,
    setIsValidUser,
  } = useContext(ShoppingCartContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setMessage('Log in to your account')
    if (userSelected) {
      setEmail(userSelected.email)
      setPassword(userSelected.password)
    }
  }, [setMessage]);

  const validateUser = useCallback(() => {
    const validateInUsers = users.some(user => user.email === email && user.password === password)
    !validateInUsers ? setMessage('This user don\'t have an account') : setMessage('Log in to your account')
    setIsValidUser(validateInUsers);
  }, [email, password, setIsValidUser])

  useEffect(() => {
    validateUser();
  }, [validateUser]);

  const handleUserSubmit = (e) => {
    e.preventDefault()

    if (isValidUser) {
      const filteredUser = users.find(user => user.email === email && user.password === password)
      setUserSelected(filteredUser)
    } else {
      setMessage('All fields are required!!')
    }
  }

  const styles = !isValidUser ? 'text-red-500' : '';

  return (
    <Layout>
      
      <div className="max-w-md my-10 relative flex flex-col p-4 rounded-md text-black bg-gray shadow-lg">
        <div className="text-2xl font-bold mb-2 text-black text-center">Sign In 
          <span className="text-[#7747ff]">Shopi</span>
        </div>
        <div className={`${styles} text-sm font-normal mb-4 text-center text-[#1e0e4b]`}>{message}</div>
        <form 
          onSubmit={handleUserSubmit}
          className="flex flex-col gap-3"
        >
          <div className="block relative"> 
            <label htmlFor="email" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Email</label>
            <input 
              type="text" 
              id="email" 
              value={email}
              className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0" 
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="block relative"> 
            <label htmlFor="password" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Password</label>
            <input 
              type="text" 
              id="password" 
              value={password}
              className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0" 
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <a className="text-sm text-[#7747ff]" href="#">Forgot your password?</a>
          </div>
          <button 
            type="submit" 
            className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal"
            disabled={!isValidUser}
          >
            Submit
          </button>
        </form>
        <div className="text-sm text-center mt-[1.6rem]">Don't have an account yet? &nbsp;
          <Link to='/register'>
            <span className="text-sm text-[#7747ff]" href="#">Sign up for free!</span>
          </Link> 
        </div>
      </div>

    </Layout>
  )
}

export default SignIn