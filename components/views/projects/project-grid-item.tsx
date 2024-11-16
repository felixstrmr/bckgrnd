import { Project } from '@/types'

type Props = {
  project: Project
}

export default function ProjectGridItem({ project }: Props) {
  return <div>{project.name}</div>
}
