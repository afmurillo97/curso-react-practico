import { useContext } from 'react'
import { ShoppingCartContext } from '../../Context'
import Layout from '../../Components/Layout'

function MyAccount() {

  const { userSelected } = useContext(ShoppingCartContext);

  return (
    <Layout>
      
      <div className="max-w-md w-96 my-10 relative flex flex-col p-4 rounded-md text-black bg-gray shadow-lg">
        <div className="text-2xl font-bold mb-2 text-black text-center">My Account &nbsp;
          <span className="text-[#7747ff]">Shopi</span>
        </div>
        <form 
          className="flex flex-col gap-3"
        >
          <div className="block relative"> 
            <label htmlFor="name" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Name</label>
            <input 
              type="text" 
              id="name" 
              value={userSelected?.name}
              className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0" 
            />
          </div>
          <div className="block relative"> 
            <label htmlFor="email" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Email</label>
            <input 
              type="text" 
              id="email" 
              value={userSelected?.email}
              className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0" 
            />
          </div>
          <div className="block relative"> 
            <label htmlFor="password" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Password</label>
            <input 
              type="text" 
              id="password" 
              value={userSelected?.password}
              className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0" 
            />
          </div>
          <button 
            type="text" 
            className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal"
          >
            Edit
          </button>
        </form>

      </div>

    </Layout>
  )
}

export default MyAccount