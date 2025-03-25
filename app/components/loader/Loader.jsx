import Image from 'next/image'
import React from 'react'

const Loader = () => {
  return (
    <div className={` text-white py-[5px] px-4 rounded-[8px] mt-5`}>
        <Image src="/images/loader.gif" width={30} height={30} className='mx-auto' alt="Loader image" />
    </div>
  )
}

export default Loader