import React from 'react'
import Button from '../UIcomponents/Button'
import { UserPlusIcon } from '@heroicons/react/24/solid'
import { UserCircleIcon } from '@heroicons/react/24/solid'
function HomePage() {
  return (
    <div className='bg-white'>
      <h1 className='text-2xl mt-5 text-center font-bold lg:text-5xl'>Easy and secure access to your content</h1>
      <p className='text-center mt-3 p-3 text-lg'>Store, share, and collaborate on files and folders from your mobile device, tablet, or computer</p>
      <div className='flex justify-center space-x-8 mt-3'>
      <button className='bg-[#6a5feb] text-white rounded-full p-3' >Try Our Drive </button>
      <button className='bg-[#6a5feb] text-white rounded-full p-3'>Go to Drive </button>
      
      </div>
      <img className='mt-11' src='https://pcdn-www.pcloud.com/Zeh/images/p_home/photos@2x.png'/>
    </div>
  )
}

export default HomePage