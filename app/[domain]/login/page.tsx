import WorkspaceLoginForm from '@/components/forms/workspace-login-form'
import Bckgrnd from '@/components/icons/bckgrnd'

export default function Page() {
  return (
    <div className='flex size-full items-center justify-center bg-muted'>
      <div className='rounded-lg border bg-background p-9 shadow-lg'>
        <Bckgrnd className='mb-4' />
        <h1 className='text-2xl font-semibold tracking-tight'>Welcome back!</h1>
        <p className='mb-6 text-sm text-muted-foreground'>
          Enter your details to get started!
        </p>
        <WorkspaceLoginForm />
      </div>
    </div>
  )
}
