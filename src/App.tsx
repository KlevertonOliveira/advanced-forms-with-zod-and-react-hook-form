import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { createUserFormSchema } from './schemas/createUserFormSchema';
import { CreateUserFormData } from './types/CreateUserFormData';

export default function App() {
  const [output, setOutput] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'techs',
  });

  function addNewTech() {
    append({ title: '', workload: 0 });
  }

  function createUser(userData: CreateUserFormData) {
    setOutput(JSON.stringify(userData, null, 2));
  }

  return (
    <main className='flex items-center justify-center min-h-screen bg-zinc-900'>
      <form
        className='flex flex-col w-full max-w-sm gap-4 p-10 rounded-md shadow-md bg-zinc-800'
        onSubmit={handleSubmit(createUser)}
      >
        <h2 className='mb-3 text-4xl font-bold text-center text-white'>
          Create an account
        </h2>
        <div className='flex flex-col gap-1'>
          <label className='text-lg text-white' htmlFor='name'>
            Name:
          </label>
          <input
            className='h-10 px-2 text-white border rounded shadow-sm bg-zinc-500 border-zinc-400'
            type='text'
            id='name'
            {...register('name')}
          />
          {errors.name && (
            <span className='mt-[2px] text-sm text-red-400'>
              {errors.name.message}
            </span>
          )}
        </div>
        <div className='flex flex-col gap-1'>
          <label className='text-lg text-white' htmlFor='age'>
            Age:
          </label>
          <input
            className='h-10 px-2 text-white border rounded shadow-sm bg-zinc-500 border-zinc-400'
            type='number'
            id='age'
            {...register('age')}
          />
          {errors.age && (
            <span className='mt-[2px] text-sm text-red-400'>
              {errors.age.message}
            </span>
          )}
        </div>
        <div className='flex flex-col gap-1'>
          <label className='text-lg text-white' htmlFor='email'>
            Email:
          </label>
          <input
            className='h-10 px-2 text-white border rounded shadow-sm bg-zinc-500 border-zinc-400'
            type='email'
            id='email'
            {...register('email')}
          />
          {errors.email && (
            <span className='mt-[2px] text-sm text-red-400'>
              {errors.email.message}
            </span>
          )}
        </div>
        <div className='flex flex-col gap-1'>
          <label className='text-lg text-white' htmlFor='password'>
            Password:
          </label>
          <input
            className='h-10 px-2 text-white border rounded shadow-sm bg-zinc-500 border-zinc-400'
            type='password'
            id='password'
            {...register('password')}
          />
          {errors.password && (
            <span className='mt-[2px] text-sm text-red-400'>
              {errors.password.message}
            </span>
          )}
        </div>
        <div className='flex flex-col gap-1'>
          <label className='text-lg text-white' htmlFor='confirmPassword'>
            Confirm Password:
          </label>
          <input
            className='h-10 px-2 text-white border rounded shadow-sm bg-zinc-500 border-zinc-400'
            type='password'
            id='confirmPassword'
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <span className='mt-[2px] text-sm text-red-400'>
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        {/* Field Array */}
        <div className='flex flex-col gap-1'>
          <label
            className='flex justify-between text-lg text-white'
            htmlFor='techs'
          >
            Technologies
            <button
              className='text-sm text-emerald-500'
              onClick={addNewTech}
              type='button'
            >
              Adicionar
            </button>
          </label>
          {fields.map((field, index) => (
            <div key={field.id} className='flex justify-between gap-1'>
              <div className='flex flex-col flex-1 gap-1'>
                <input
                  className='h-10 px-2 text-white border rounded shadow-sm bg-zinc-500 border-zinc-400'
                  type='text'
                  id='title'
                  placeholder='title'
                  {...register(`techs.${index}.title`)}
                />
                {errors.techs?.[index]?.title && (
                  <span className='mt-[2px] text-sm text-red-400'>
                    {errors.techs?.[index]?.title?.message}
                  </span>
                )}
              </div>
              <div className='flex flex-col flex-1 gap-1'>
                <input
                  className='w-16 h-10 px-2 text-white border rounded shadow-sm bg-zinc-500 border-zinc-400'
                  type='number'
                  id='workload'
                  {...register(`techs.${index}.workload`)}
                />
                {errors.techs?.[index]?.workload && (
                  <span className='mt-[2px] text-sm text-red-400'>
                    {errors.techs?.[index]?.workload?.message}
                  </span>
                )}
              </div>
            </div>
          ))}

          {errors.techs && (
            <span className='mt-[2px] text-sm text-red-400'>
              {errors.techs.message}
            </span>
          )}
        </div>

        <button
          type='submit'
          className='h-10 text-lg font-semibold text-white transition-colors rounded bg-emerald-600 hover:bg-emerald-700'
        >
          Submit
        </button>
        <pre className='text-white'>{output}</pre>
      </form>
    </main>
  );
}
