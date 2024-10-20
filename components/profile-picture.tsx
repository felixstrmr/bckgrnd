import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User } from '@/types'

type Props = {
  user: User
  className?: string
}

export default function ProfilePicture({ user, className }: Props) {
  const initials =
    user.name
      ?.split(' ')
      .map((name) => name[0])
      .join('') ?? user.email.split('@')[0]

  return (
    <Avatar className={className}>
      <AvatarImage src={user.avatar_url!} />
      <AvatarFallback className='bg-primary uppercase text-primary-foreground'>
        {initials}
      </AvatarFallback>
    </Avatar>
  )
}
