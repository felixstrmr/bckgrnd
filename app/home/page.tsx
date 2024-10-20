import { Palette } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Page() {
  return (
    <div className='size-full rounded-lg border bg-background shadow-md'>
      <div className='mx-auto flex w-full max-w-5xl flex-col pt-24'>
        <Link
          href={''}
          className='w-fit rounded-full bg-muted px-3 py-0.5 text-muted-foreground'
        >
          Follow us on X for updates!
        </Link>
        <h1 className='mt-4 max-w-2xl'>
          Streamline your <Palette className='inline-block size-12' strokeWidth={2.5} />{' '}
          design workflow with ease.
        </h1>
        <p className='mt-4 max-w-lg text-lg text-muted-foreground'>
          Enhance your efficiency and delight clients with seamless collaboration and
          project management features.
        </p>
      </div>
      <div className='mx-auto mt-32 flex w-fit rounded-3xl border p-2'>
        <Image
          src={'/hero-image.svg'}
          alt={'Hero Image'}
          width={1280}
          height={720}
          className='mx-auto aspect-video max-w-7xl rounded-2xl shadow-xl'
        />
      </div>
    </div>
  )
}
