import CreateProjectForm from '@/components/forms/create-project-form'
import { buttonVariants } from '@/components/ui/button'
import { createClient } from '@/lib/clients/supabase/server'
import { cn, getDomain } from '@/lib/utils'
import { getWorkspaceWithCache } from '@/queries/cached/workspace'
import { getClients } from '@/queries/client'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

type Props = {
  params: Promise<{ domain: string }>
  searchParams: Promise<{ status: string | undefined }>
}

export default async function Page({ params, searchParams }: Props) {
  let { domain } = await params
  domain = getDomain(domain)

  const { status } = await searchParams

  const supabase = await createClient()
  const [workspace, clients] = await Promise.all([
    getWorkspaceWithCache(supabase, domain),
    getClients(supabase, domain),
  ])

  return (
    <div className='flex size-full flex-col space-y-12 p-6'>
      <Link
        href={'/dashboard/projects'}
        className={cn(buttonVariants({ variant: 'ghost' }), 'w-fit')}
      >
        <ArrowLeft className='size-4' />
        Projects
      </Link>
      <div className='mx-auto w-full max-w-2xl'>
        <CreateProjectForm
          workspaceId={workspace.id}
          clients={clients}
          statusId={status}
        />
      </div>
    </div>
  )
}
