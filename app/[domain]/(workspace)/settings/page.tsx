import { Separator } from '@/components/ui/separator'

export default function Page() {
  return (
    <div className='flex size-full flex-col px-6'>
      <div className='flex w-full flex-col'>
        <h4>My Account</h4>
        <p className='text-sm text-muted-foreground'>
          Update your personal account settings.
        </p>
        <Separator className='my-4' />
      </div>
    </div>
  )
}
