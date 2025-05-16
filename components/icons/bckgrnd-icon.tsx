import type { SVGProps } from 'react'

export default function BckgrndIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <g filter='url(#filter0_i_754_39)'>
        <rect width='32' height='32' rx='8' fill='url(#paint0_linear_754_39)' />
      </g>
      <rect x='0.5' y='0.5' width='31' height='31' rx='7.5' stroke='#27272A' />
      <path
        d='M16 17.3333C16 16.597 16.597 16 17.3333 16H22.6667C23.403 16 24 16.597 24 17.3333V22.6667C24 23.403 23.403 24 22.6667 24H17.3333C16.597 24 16 23.403 16 22.6667V17.3333Z'
        fill='white'
      />
      <path
        d='M16 14.6667C16 15.403 15.403 16 14.6667 16L9.33333 16C8.59695 16 8 15.403 8 14.6667L8 9.33333C8 8.59695 8.59695 8 9.33333 8L14.6667 8C15.403 8 16 8.59695 16 9.33333L16 14.6667Z'
        fill='white'
      />
      <path
        d='M24 12C24 14.2091 22.2091 16 20 16C17.7909 16 16 14.2091 16 12C16 9.79086 17.7909 8 20 8C22.2091 8 24 9.79086 24 12Z'
        fill='white'
      />
      <path
        d='M8 20C8 17.7909 9.79086 16 12 16C14.2091 16 16 17.7909 16 20C16 22.2091 14.2091 24 12 24C9.79086 24 8 22.2091 8 20Z'
        fill='white'
      />
      <defs>
        <filter
          id='filter0_i_754_39'
          x='0'
          y='0'
          width='32'
          height='32'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='BackgroundImageFix'
            result='shape'
          />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='2' />
          <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.15 0'
          />
          <feBlend
            mode='normal'
            in2='shape'
            result='effect1_innerShadow_754_39'
          />
        </filter>
        <linearGradient
          id='paint0_linear_754_39'
          x1='16'
          y1='0'
          x2='16'
          y2='32'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#52525B' />
          <stop offset='1' stopColor='#27272A' />
        </linearGradient>
      </defs>
    </svg>
  )
}
