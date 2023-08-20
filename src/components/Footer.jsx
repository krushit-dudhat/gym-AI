import React from "react";

function Footer() {
  return (
    <>
      <footer class='fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600'>
      <div className=''>
        <div className='container flex justify-around m-auto text-white'>
          <div className='m-2 font-bold font-serif text-xl'>Gym AI</div>
          <div className='m-2'>
            contact: krushitdudhat2001@gmail.com
          </div>
        </div>
      </div>
        <span class='text-sm text-gray-500 sm:text-center dark:text-gray-400'>
          © 2023 {"  "}
          <a href='https://github.com/krushit-dudhat' class='hover:underline'>
            Krushit Dudhat
          </a>
          . All Rights Reserved.
        </span>
      </footer>
    </>
  );
}

export default React.memo(Footer);
