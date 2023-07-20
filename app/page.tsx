'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [intputValue, setInputValue] = useState('');
  const { push } = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (intputValue === '') {
      alert('Please enter your name');
    } else {
      push(`/search/${intputValue}`);
    }
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-center'>
      <div className='shadow-xl shadow-red-500 p-12 space-y-5 rounded'>
        <h1 className='text-2xl font-semibold'>Enter Your Name</h1>
        <form onSubmit={handleSubmit} className=' space-y-5'>
          <input
            value={intputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className='border-none rounded p-1 w-full text-black'
            type='text'
            placeholder='Type your name...'
          />
          <button className='bg-red-500 rounded p-2 px-4 font-semibold hover:scale-105 transform transition-all duration-200 w-full'>
            Search
          </button>
        </form>
      </div>
    </main>
  );
}

//input icini bos birakirsa alert cikarir eger yazarsa push ile search/[name] sayfasina gider
//ts: event olayinin tipini belirtmek icin `FormEvent` kullanilir