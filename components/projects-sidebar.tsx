import { Project } from '@/types'

type Props = {
  project: Project
}

export default function ProjectsSidebar({ project }: Props) {
  return (
    <div className='flex w-64 max-w-64 min-w-64 flex-col border-r'>
      <div className='p-4'>{project.name}</div>
    </div>
  )
}
