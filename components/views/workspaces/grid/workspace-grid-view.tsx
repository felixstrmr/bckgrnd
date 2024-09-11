import WorkspaceGridItem from '@/components/views/workspaces/grid/workspace-grid-item'
import { Workspace } from '@/types'

type Props = {
  workspaces: Workspace[]
}

export default function WorkspaceGridView({ workspaces }: Props) {
  return (
    <div className='flex space-x-4'>
      {workspaces.map((workspace) => (
        <WorkspaceGridItem key={workspace.id} workspace={workspace} />
      ))}
    </div>
  )
}
