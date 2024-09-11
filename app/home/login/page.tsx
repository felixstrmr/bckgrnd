import HomeLoginForm from '@/components/forms/home-login-form'

export default function Page() {
  return (
    <div className='flex size-full p-6'>
      <div className='flex w-2/3 items-center justify-center'>
        <HomeLoginForm />
      </div>
      <div className='w-1/3 rounded-lg bg-muted' />
    </div>
  )
}
