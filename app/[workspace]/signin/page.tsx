import WorkspaceSigninForm from '@/components/forms/workspace-signin-form'
import BckgrndIcon from '@/components/icons/bckgrnd-icon'
import { getDomain } from '@/lib/utils'
import { getWorkspaceUser } from '@/queries/cached'
import { redirect } from 'next/navigation'

type Props = {
  params: Promise<{ workspace: string }>
}

export default async function Page({ params }: Props) {
  const { workspace } = await params
  const domain = getDomain(workspace)

  const workspaceUser = await getWorkspaceUser(domain)

  if (workspaceUser) {
    return redirect(`/dashboard`)
  }

  return (
    <div className='flex size-full items-center justify-center'>
      <div className='bg-background rounded-lg border p-8 shadow-lg'>
        <BckgrndIcon />
        <div className='mt-4 mb-8'>
          <h1 className='text-xl font-semibold tracking-tight'>
            Welcome back!
          </h1>
          <p className='text-muted-foreground text-sm'>
            Enter your details to continue.
          </p>
        </div>
        <WorkspaceSigninForm />
      </div>
    </div>
  )
}
