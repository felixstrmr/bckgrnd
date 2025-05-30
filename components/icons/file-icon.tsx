import type { SVGProps } from 'react'

const FileIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='currentColor'
    {...props}
  >
    <path d='M15 1v5c0 .564.436 1 1 1h5a1 1 0 0 0-.293-.707l-5-5A1 1 0 0 0 15 1Z' />
    <path d='M21 9h-5c-1.645 0-3-1.355-3-3V1H6C4.355 1 3 2.355 3 4v16c0 1.645 1.355 3 3 3h12c1.645 0 3-1.355 3-3z' />
  </svg>
)

export default FileIcon
