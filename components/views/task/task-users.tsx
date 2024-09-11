import ProfilePicture from '@/components/profile-picture'
import { TaskUserWithRelations } from '@/types'

type Props = {
  taskUsers: TaskUserWithRelations[]
}

export default function TaskUsers({ taskUsers }: Props) {
  return (
    <div className='flex -space-x-3'>
      {taskUsers.map((taskUser) => (
        <ProfilePicture key={taskUser.id} user={taskUser.user} />
      ))}
    </div>
  )
}
