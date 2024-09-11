import AddProjectForm from '@/components/forms/add-project-form'
import { env } from '@/lib/env'
import { createClient } from '@/lib/supabase/server'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

type Props = {
  params: {
    domain: string
  }
}

export default async function Page({ params }: Props) {
  const supabase = createClient()
  const domain = params.domain.replace(`.${env.NEXT_PUBLIC_ROOT_DOMAIN}`, '')

  const { data: clients, error } = await supabase
    .from('clients')
    .select('*, workspace:workspaces(domain)')
    .eq('workspace.domain', domain)

  if (error) {
    console.error(error)
    return <div>Error</div>
  }

  return (
    <div className='flex size-full flex-col space-y-12 p-6'>
      <Link
        href={'/projects'}
        className='flex items-center text-sm text-muted-foreground transition-all hover:text-foreground'
      >
        <ChevronLeft className='mr-1 size-4' />
        All projects
      </Link>
      <div className='mx-auto w-full max-w-lg space-y-12 animate-in slide-in-from-bottom-3'>
        <div className='space-y-1'>
          <h4>Let&apos;s create a new project</h4>
          <p className='text-sm text-muted-foreground'>
            Enter the project details and assign it to a client.
          </p>
        </div>
        <AddProjectForm domain={domain} clients={clients} />
      </div>
    </div>
  )
}
