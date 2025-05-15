import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div>
      <div>
        <Link href="/"> 
        <Image src="logo-.svg" alt='logo' width={150} height={150} className='p-3 '/>
        </Link>
      </div>
    </div>
  )
}

export default Navbar
