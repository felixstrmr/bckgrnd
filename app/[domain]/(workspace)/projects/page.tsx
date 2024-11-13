import { getProjectsWithCache } from '@/lib/queries/cached'
import { createClient } from '@/lib/supabase/server'
import { getDomain } from '@/lib/utils'

type Props = {
  params: Promise<{ domain: string }>
}

export default async function Page({ params }: Props) {
  let { domain } = await params
  domain = getDomain(domain)

  const supabase = await createClient()
  const projects = await getProjectsWithCache(supabase, domain)

  return (
    <div>
      <pre>{JSON.stringify(projects, null, 2)}</pre>
    </div>
  )
}
