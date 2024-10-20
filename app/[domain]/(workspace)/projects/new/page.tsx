import NewProjectForm from '@/components/forms/new-project-form'
import { buttonVariants } from '@/components/ui/button'
import { env } from '@/lib/env'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

type Props = {
  params: {
    domain: string
  }
}

export default function Page({ params }: Props) {
  const domain = params.domain.replace(`.${env.NEXT_PUBLIC_ROOT_DOMAIN}`, '')

  return (
    <div className='flex size-full flex-col space-y-6 p-6'>
      <Link
        href={'/projects'}
        className={buttonVariants({ variant: 'outline', size: 'icon' })}
      >
        <ArrowLeft className='size-4' />
      </Link>
      <div className='mx-auto w-full max-w-lg'>
        <h3>New Project</h3>
        <p className='mb-6 text-sm text-muted-foreground'>Enter the project details</p>
        <NewProjectForm domain={domain} />
      </div>
    </div>
  )
}
