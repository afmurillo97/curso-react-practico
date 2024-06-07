import React, { useContext, useEffect, useCallback,useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCartContext } from '../../Context';
import Layout from '../../Components/Layout';

function Register() {
  const navigate = useNavigate();
  const {
    users,
    setUsers,
    isRegistered,
    setIsRegistered,
    message,
    setMessage,
    isValidUser,
    setIsValidUser,
		setUserSelected
  } = useContext(ShoppingCartContext)

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');

  useEffect(() => {
    setMessage('Log in to your new account')
  }, [setMessage]);

  const validateUser = useCallback(() => {
    setIsValidUser(name && email && password && password === repeatPassword && !isRegistered)
  }, [name, email, password, repeatPassword, isRegistered, setIsValidUser])

  useEffect(() => {
    validateUser();
  }, [validateUser]);

  const handleRegister = (e) => {
    e.preventDefault()

    if (isValidUser && !isRegistered) {
      setUsers([...users, { name, email, password }])
			setUserSelected({ name, email, password })
      setName('')
      setEmail('')
      setPassword('')
      setRepeatPassword('')
      navigate('/')
    } else {
      setMessage(!isValidUser ? 'All fields are required!!' : 'This user already exists!!')
    }
  };

  const verifyEmail = (e) => {
    const emailValue = e.target.value;
    const registered = users.some((user) => user.email === emailValue);

    if (registered) {
      setIsRegistered(true);
      setMessage('This user already exists!!');
    } else {
      setEmail(emailValue);
      setIsRegistered(false);
      setMessage('Log in to your new account');
    }
  };

  const styles = isRegistered ? 'text-red-500' : '';

  return (
    <Layout>
      <div className='max-w-md w-96 my-10 relative flex flex-col p-4 rounded-md text-black bg-gray shadow-lg'>
        <div className='text-2xl font-bold mb-2 text-black text-center'>
          Register <span className='text-[#7747ff]'>Shopi</span>
        </div>
        <div className={`text-sm ${styles} font-normal mb-4 text-center text-[#1e0e4b]`}>
          {message}
        </div>
        <form onSubmit={handleRegister} className='flex flex-col gap-3'>
          <div className='block relative'>
            <label htmlFor='name' className='block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2'>
              Name
            </label>
            <input
              type='text'
              id='name'
              value={name}
              className={`rounded border ${name ? 'border-gray-200' : 'border-red-400'} text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0`}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='block relative'>
            <label htmlFor='email' className='block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2'>
              Email
            </label>
            <input
              type='text'
              id='email'
              value={email}
              className={`rounded border ${email && !isRegistered ? 'border-gray-200' : 'border-red-400'} text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0`}
              onChange={verifyEmail}
            />
          </div>
          <div className='block relative'>
            <label htmlFor='password' className='block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2'>
              Password
            </label>
            <input
              type='text'
              id='password'
              value={password}
              className={`rounded border ${password ? 'border-gray-200' : 'border-red-400'} text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0`}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='block relative'>
            <label htmlFor='repeat_password' className='block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2'>
              Repeat Password
            </label>
            <input
              type='text'
              id='repeat_password'
              value={repeatPassword}
              className={`rounded border ${password && password === repeatPassword ? 'border-gray-200' : 'border-red-400'} text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0`}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>
          <button
            type='submit'
            className='bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal'
            disabled={!isValidUser}
          >
            Register
          </button>
        </form>
        <div className='text-sm text-center mt-[1.6rem]'>
          Do you have an account? &nbsp;
          <Link to='/sign-in'>
            <span className='text-sm text-[#7747ff]'>Sign In now!!</span>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default Register;
