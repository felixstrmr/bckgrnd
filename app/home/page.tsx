import JoinWaitlistForm from '@/components/forms/join-waitlist-form'

export default async function Page() {
  return (
    <>
      <section className='min-h-screen pt-32'>
        <div className='mx-auto w-full max-w-5xl gap-12 px-2'>
          <h1 className='text-balance bg-gradient-to-tl from-foreground to-[#262626] bg-clip-text text-transparent'>
            The All-in-One Platform for Managing Your Design Projects.
          </h1>
          <p className='mt-4 max-w-2xl text-xl text-muted-foreground'>
            Bckgrnd helps designers manage projects, files, list tasks,
            collaborate with clients, and deliver work without the bother of
            being on multiple apps.
          </p>
          <div className='mt-9'>
            <JoinWaitlistForm />
          </div>
        </div>
        <div className='mx-auto mt-32 aspect-video w-full max-w-6xl rounded-2xl border p-2'>
          <div className='aspect-video rounded-md bg-foreground shadow-lg'></div>
        </div>
      </section>
    </>
  )
}
