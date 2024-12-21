'use client'

import { cn } from '@/lib/utils'
import { Files, Hourglass, ListTodo, MessageCircle } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function HeroImages() {
  const tabs = [
    {
      title: 'Projects & Tasks',
      description: 'Keep track of your todos & projects.',
      icon: ListTodo,
      image:
        'https://gmltfsdubomonqecltxr.supabase.co/storage/v1/object/public/web/hero-image-projects-tasks.webp',
      comingSoon: false,
    },
    {
      title: 'Client Collaboration',
      description: 'Stay in the loop with your clients.',
      icon: MessageCircle,
      image:
        'https://gmltfsdubomonqecltxr.supabase.co/storage/v1/object/public/web/hero-image-client-collaboration.webp',
      comingSoon: false,
    },
    {
      title: 'Files & Assets',
      description: 'Easily store and share files & assets.',
      icon: Files,
      image: '',
      comingSoon: true,
    },
  ]

  const [tab, setTab] = React.useState<string>(tabs[0].title)

  const currentImage = tabs.find((t) => t.title === tab)?.image

  return (
    <div>
      <div className='mx-auto flex w-full max-w-5xl items-center gap-2 px-4 sm:px-6'>
        <div className='grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
          {tabs.map((t) => (
            <button
              disabled={t.comingSoon}
              key={t.title}
              onClick={() => setTab(t.title)}
              className={cn(
                'relative flex flex-col border-b border-transparent p-4 transition-colors duration-300 sm:p-6',
                tab === t.title
                  ? 'border-primary opacity-100'
                  : 'border-primary/20 opacity-75 hover:opacity-100',
                t.comingSoon && 'opacity-100',
              )}
            >
              {t.comingSoon && (
                <div className='absolute inset-0 z-30 flex items-center justify-center backdrop-blur-[1px]'>
                  <div className='z-40 flex h-7 items-center justify-center rounded-md border bg-background px-3 text-sm text-muted-foreground shadow-md'>
                    <Hourglass className='mr-2 size-3.5' />
                    Coming Soon
                  </div>
                </div>
              )}
              <div
                className={cn(
                  'relative mb-4 flex size-8 items-center justify-center rounded-md border shadow',
                  tab === t.title
                    ? 'border-primary bg-gradient-to-t from-primary to-[#49494E] text-primary-foreground'
                    : 'border-border bg-background text-muted-foreground',
                )}
              >
                <div
                  className={cn(
                    'pointer-events-none absolute -bottom-8 -right-8 size-12 bg-[#D88527] mix-blend-plus-lighter blur-lg',
                    tab === t.title ? 'opacity-100' : 'opacity-0',
                  )}
                />
                <t.icon className='size-4' />
              </div>

              <p className='text-base font-semibold'>{t.title}</p>
              <p className='text-sm text-muted-foreground'>{t.description}</p>
            </button>
          ))}
        </div>
      </div>
      <div className='relative mx-auto mt-8 w-full max-w-6xl px-4 sm:mt-12 sm:px-6'>
        <div className='absolute inset-0 z-30 bg-gradient-to-t from-background to-transparent' />
        <Image
          src={currentImage!}
          alt='Hero Image'
          width={1920}
          height={1080}
          className='relative z-20 rounded-xl'
          priority
        />
      </div>
    </div>
  )
}
