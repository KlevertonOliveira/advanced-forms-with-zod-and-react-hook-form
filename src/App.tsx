export default function App() {
  return (
    <main className='min-h-screen bg-zinc-800 flex justify-center items-center'>
      <form className='flex flex-col gap-6 w-full max-w-sm bg-zinc-700 shadow-md p-10 rounded-md'>
        <h2 className='text-center text-white font-bold text-4xl mb-3'>
          Create an account
        </h2>
        <div className='flex flex-col gap-1'>
          <label className='text-white text-lg' htmlFor='email'>
            Email:
          </label>
          <input
            className='border border-zinc-200 shadow-sm rounded h-10'
            type='email'
            name='email'
            id='email'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label className='text-white text-lg' htmlFor='password'>
            Password:
          </label>
          <input
            className='border border-zinc-200 shadow-sm rounded h-10'
            type='password'
            name='password'
            id='password'
          />
        </div>
        <button
          type='submit'
          className='bg-emerald-600 text-white rounded h-10 text-lg font-semibold hover:bg-emerald-700 transition-colors'
        >
          Submit
        </button>
      </form>
    </main>
  );
}
