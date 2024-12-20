'use client';
import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
interface ShortenedFormProps {
  handleUrlShortened: () => void;
}
const ShortenForm = ({ handleUrlShortened }: ShortenedFormProps) => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      await response.json();
      setUrl('');
      handleUrlShortened();
    } catch (error) {
      console.error('Error shortening url: ', error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className='mb-4'>
      <div className='space-y-4'>
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className='h-12'
          type='url'
          placeholder='Enter URL to shorten'
          required
        />
        <Button disabled={isLoading} className='w-full p-2'>
          {isLoading ? 'Shortening URL processing' : 'Shorten URL'}
        </Button>
      </div>
    </form>
  );
};

export default ShortenForm;
