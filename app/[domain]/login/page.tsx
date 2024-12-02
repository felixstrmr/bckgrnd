import LoginForm from '@/components/forms/login-form'
import Bckgrnd from '@/components/icons/bckgrnd'

export default function Page() {
  return (
    <div className='relative flex size-full items-center justify-center'>
      <div className='absolute inset-0 -z-40 size-full bg-[url(https://bipjaqofywtmfirkmtdw.supabase.co/storage/v1/object/public/web/bg.webp)] bg-cover bg-center' />
      <div className='absolute -z-30 size-96 bg-gradient-to-t from-background to-[#B79891] blur-[100px]' />
      <div className='absolute inset-0 bottom-0 -z-40 w-full bg-gradient-to-t from-background to-transparent' />
      <div className='relative z-20 space-y-4 rounded-2xl border bg-background p-9'>
        <div>
          <Bckgrnd className='mb-6 size-9' />
          <h4>Welcome back!</h4>
          <p className='text-sm text-muted-foreground'>
            Log in to your account to continue.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
