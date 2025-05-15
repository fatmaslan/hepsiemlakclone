import React from 'react'



interface AuthLayoutProps {
    children: React.ReactNode;
  }

const Authlayout = ({ children }: AuthLayoutProps) => {
  return (

    <div className='flex flex-col items-center justify-center h-screen '>
     {children}
    </div>

  )
}

export default Authlayout