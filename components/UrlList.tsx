import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import { FaCopy, FaEye } from 'react-icons/fa';

const UrlList = () => {
  return (
    <div>
      <h2 className='text-2xl font-bold mb-2'>Recent URLs</h2>
      <ul className='space-y-2'>
        <li className='flex items-center gap-2 justify-between'>
          <Link
            className='text-blue-300'
            target='_blank'
            href={
              ' https://www.youtube.com/watch?v=mr9vOla2AMc&list=PLVCBZnWrBOyjeF7PKMQS1yYzMMOlFwL8A&index=13'
            }>
            https://chatgpt.com/c/6749cf16-7c30-8002-ba35-c33c80a362fc
          </Link>
          <div className='flex items-center gap-3'>
            <Button
              variant='ghost'
              size='icon'
              className='text-muted-foreground hover:bg-muted'>
              <FaCopy />
              <span className='sr-only'>Copy Url</span>
            </Button>
            <span className='flex items-center'>
              <FaEye />
              100 views
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default UrlList;
