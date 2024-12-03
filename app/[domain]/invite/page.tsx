type Props = {
  searchParams: Promise<{ token: string }>
}

export default async function Page({ searchParams }: Props) {
  const { token } = await searchParams

  if (!token) {
    throw new Error('Invalid token')
  }

  return <div>{token}</div>
}
