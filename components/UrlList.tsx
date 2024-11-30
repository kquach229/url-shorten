'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { FaCheckCircle, FaCopy, FaEye } from 'react-icons/fa';
type Url = {
  id: string;
  shortCode: string;
  originalUrl: string;
  visits: number;
};
const UrlList = () => {
  const [urls, setUrls] = useState<Url[]>([]);
  const [copied, setCopied] = useState<boolean>(false);
  const [copyUrl, setCopyUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const shortenerUrl = (code: string) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/${code}`;

  const fetchUrls = async () => {
    try {
      const response = await fetch('/api/urls');
      const data = await response.json();
      setUrls(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('error fetching urls:', error);
    }
  };

  const handleCopyUrl = (code: string) => {
    const fullUrl = `${shortenerUrl(code)}`;
    setCopyUrl(code);
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setCopyUrl('');
      }, 3000);
    });
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2 className='text-2xl font-bold mb-2'>Recent URLs</h2>
      <ul className='space-y-2'>
        {urls.map((url) => (
          <li
            key={url.id}
            className='flex items-center gap-2 justify-between bg-card rounded-md text-card-foreground border p-3'>
            <Link
              className='text-blue-300'
              target='_blank'
              href={`/${url.shortCode}`}>
              {shortenerUrl(url.shortCode)}
            </Link>
            <div className='flex items-center gap-3'>
              <Button
                onClick={() => handleCopyUrl(url.shortCode)}
                variant='ghost'
                size='icon'
                className='text-muted-foreground hover:bg-muted'>
                {copied && copyUrl === url.shortCode ? (
                  <FaCheckCircle />
                ) : (
                  <FaCopy />
                )}

                <span className='sr-only'>Copy Url</span>
              </Button>
              <span className='flex items-center gap-2'>
                <FaEye />
                {`${url.visits} views`}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UrlList;
