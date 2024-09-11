import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User } from '@/types'
import Image from 'next/image'

type Props = {
  className?: string
  user: User
}

export default function ProfilePicture({ user, className }: Props) {
  const initials = user.name
    ?.split(' ')
    ?.map((name) => name[0])
    ?.join('')

  return (
    <Avatar className={className}>
      <AvatarImage asChild src={user.avatar_url!}>
        <Image
          src={user.avatar_url!}
          alt={user.name || user.email}
          width={36}
          height={36}
          className='aspect-square object-cover'
        />
      </AvatarImage>
      <AvatarFallback className='uppercase'>{initials}</AvatarFallback>
    </Avatar>
  )
}
