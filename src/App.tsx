import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function App() {
  const { register, handleSubmit } = useForm();
  const [output, setOutput] = useState('');

  function createUser(data: any) {
    setOutput(JSON.stringify(data, null, 2));
  }

  return (
    <main className='min-h-screen bg-zinc-900 flex justify-center items-center'>
      <form
        className='flex flex-col gap-6 w-full max-w-sm bg-zinc-800 shadow-md p-10 rounded-md'
        onSubmit={handleSubmit(createUser)}
      >
        <h2 className='text-center text-white font-bold text-4xl mb-3'>
          Create an account
        </h2>
        <div className='flex flex-col gap-1'>
          <label className='text-white text-lg' htmlFor='email'>
            Email:
          </label>
          <input
            className='bg-zinc-500 border border-zinc-400 text-white px-2 shadow-sm rounded h-10'
            type='email'
            id='email'
            {...register('email')}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label className='text-white text-lg' htmlFor='password'>
            Password:
          </label>
          <input
            className='bg-zinc-500 border border-zinc-400 text-white px-2 shadow-sm rounded h-10'
            type='password'
            id='password'
            {...register('password')}
          />
        </div>
        <button
          type='submit'
          className='bg-emerald-600 text-white rounded h-10 text-lg font-semibold hover:bg-emerald-700 transition-colors'
        >
          Submit
        </button>
        <pre className='text-white'>{output}</pre>
      </form>
    </main>
  );
}
