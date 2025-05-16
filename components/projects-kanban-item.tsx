import { Project } from '@/types'

type Props = {
  project: Project
}

export default function ProjectsKanbanItem({ project }: Props) {
  return (
    <div className='bg-background flex w-64 rounded-md border p-4 shadow-xs'>
      {project.name}
    </div>
  )
}
