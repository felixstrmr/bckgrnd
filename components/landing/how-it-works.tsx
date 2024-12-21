'use client'

import { cn } from '@/lib/utils'
import React from 'react'

const steps = [
  {
    number: '01',
    title: 'Create your workspace',
    description:
      'Setup your account and organize your design projects in one place.',
  },
  {
    number: '02',
    title: 'Invite your team & clients',
    description:
      'Collaborate seamlessly with stakeholders in a unified environment.',
  },
  {
    number: '03',
    title: 'Deliver great work',
    description:
      'Manage tasks, share files, and track progress all in one platform.',
  },
]

export default function HowItWorks() {
  const [activeStep, setActiveStep] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className='mx-auto flex w-full max-w-5xl flex-col pt-64'>
      <div className='flex flex-col'>
        <h2 className='gradient-text pb-2 text-3xl tracking-tight md:text-5xl'>
          How Bckgrnd works
        </h2>
        <p className='mt-2 text-lg text-muted-foreground'>
          Simple, streamlined, and designed for creative professionals
        </p>
      </div>
      <div className='relative mt-12 grid grid-cols-3 gap-12'>
        {steps.map((step, index) => (
          <div
            key={step.number}
            className={cn(
              'rounded-md border bg-background p-4 transition-all duration-500',
              index === activeStep
                ? 'border-border shadow-lg'
                : 'border-transparent',
            )}
          >
            <div className='relative'>
              <div
                className={cn(
                  'pointer-events-none absolute left-4 top-0 size-8 bg-[#D88527] mix-blend-plus-lighter blur-lg',
                )}
              />
              <h3 className='gradient-text mb-4 text-4xl font-semibold transition-all duration-500'>
                {step.number}
              </h3>
            </div>
            <p
              className={cn(
                'text-lg font-semibold transition-all duration-500',
                index === activeStep ? 'opacity-100' : 'opacity-75',
              )}
            >
              {step.title}
            </p>
            <p
              className={cn(
                'text-sm text-muted-foreground transition-all duration-500',
                index === activeStep ? 'opacity-100' : 'opacity-75',
              )}
            >
              {step.description}
            </p>
          </div>
        ))}
        <div className='absolute bottom-0 top-0 -z-10 my-auto h-px w-full bg-border' />
      </div>
    </div>
  )
}
