import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

type Props = {
  name: string
  avatar?: string | undefined
  size?: 'xs' | 'sm' | 'md' | 'lg'
  className?: string
}

export default function ProfilePicture({
  name,
  avatar,
  size = 'md',
  className,
}: Props) {
  const initials = name.includes(' ')
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
    : name.slice(0, 2)

  const sizeClass = {
    xs: 'size-5 text-xxs',
    sm: 'size-7 text-xs',
    md: 'size-8 text-sm',
    lg: 'size-10 text-base',
  }[size]

  return (
    <Avatar className={cn(sizeClass, className)}>
      <AvatarImage src={avatar} className={cn('object-cover', sizeClass)} />
      <AvatarFallback className={cn('border uppercase', sizeClass)}>
        {initials}
      </AvatarFallback>
    </Avatar>
  )
}
