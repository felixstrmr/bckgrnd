'use client'

import { cn } from '@/lib/utils'
import { Files, ListTodo, MessageCircle } from 'lucide-react'
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
    },
    {
      title: 'Client Collaboration',
      description: 'Stay in the loop with your clients.',
      icon: MessageCircle,
      image:
        'https://gmltfsdubomonqecltxr.supabase.co/storage/v1/object/public/web/hero-image-client-collaboration.webp',
    },
    {
      title: 'Files & Assets',
      description: 'Easily store and share files & assets.',
      icon: Files,
      image:
        'https://gmltfsdubomonqecltxr.supabase.co/storage/v1/object/public/web/hero-image-files-assets.webp',
    },
  ]

  const [tab, setTab] = React.useState<string>(tabs[0].title)

  return (
    <div>
      <div className='mx-auto flex w-full max-w-5xl items-center gap-2 px-4 sm:px-6'>
        <div className='grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
          {tabs.map((t) => (
            <button
              key={t.title}
              onClick={() => setTab(t.title)}
              className={cn(
                'relative flex flex-col items-center border-b border-transparent p-4 transition-colors duration-500 sm:p-6',
                tab === t.title
                  ? 'border-primary opacity-100'
                  : 'border-primary/20 opacity-75 hover:opacity-100',
              )}
            >
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
                    'pointer-events-none absolute top-6 size-10 bg-[#D88527] mix-blend-plus-lighter blur-lg',
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
      <div className='relative mx-auto mt-12 max-w-6xl'>
        <div className='absolute inset-0 z-40 h-[648px] w-[1152px] bg-gradient-to-t from-background to-transparent' />
        {tabs.map((t) => (
          <Image
            key={t.title}
            src={t.image}
            alt={`${t.title} Preview`}
            width={1920}
            height={1080}
            className={cn(
              'absolute rounded-xl transition-all duration-500',
              tab === t.title
                ? 'scale-100 opacity-100'
                : 'scale-95 opacity-0 blur-lg',
            )}
          />
        ))}
      </div>
    </div>
  )
}
