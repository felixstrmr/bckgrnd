import WorkspaceGridView from '@/components/views/workspaces/grid/workspace-grid-view'
import { createClient } from '@/lib/supabase/server'

export default async function Page() {
  const supabase = createClient()

  const { data: workspaces, error } = await supabase
    .from('workspaces')
    .select('*')

  if (error) {
    console.error(error)
    throw error
  }

  return (
    <div className='flex size-full flex-col space-y-6 p-6'>
      <div className='flex items-center space-x-3'>
        <h3>Workspaces</h3>
        <p className='text-muted-foreground'>{workspaces.length}</p>
      </div>
      <WorkspaceGridView workspaces={workspaces} />
    </div>
  )
}
