import type { SVGProps } from 'react'

const CircleCheckIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='currentColor'
    {...props}
  >
    <path d='M12 1C5.937 1 1 5.937 1 12s4.937 11 11 11 11-4.937 11-11S18.063 1 12 1Zm3 8a1 1 0 0 1 .707 1.707l-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L11 12.586l3.293-3.293A1 1 0 0 1 15 9Z' />
  </svg>
)

export default CircleCheckIcon
