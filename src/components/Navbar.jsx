import React from 'react';

function Navbar() {

  return (
    <>
      <div className='w-full bg-black'>
        <div className='container p-1 m-auto bg-[#0f172a] text-white'>
          <div className='flex justify-between'>
            <div className='p-2 font-bold font-serif text-2xl'>Gym AI</div>
            <div className='p-2'>
              <ul className='flex justify-around text-xl'>
                <a href='/' className='m-1'>
                  Gym Khana
                </a>
              </ul>
            </div>
            <div className='p-2'>
              <ul className='flex justify-around text-xl'>
                <span className='m-1'>Credits: 3</span>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(Navbar);