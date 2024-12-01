import LoginForm from '@/components/forms/login-form'
import Bckgrnd from '@/components/icons/bckgrnd'

export default function Page() {
  return (
    <div className='flex size-full items-center justify-center bg-muted'>
      <div className='space-y-4 rounded-2xl border bg-background p-9'>
        <Bckgrnd className='size-9' />
        <div>
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
