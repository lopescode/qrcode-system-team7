import { Sidebar } from '@/components/Sidebar'

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="flex h-screen w-screen">
      <div className='flex w-1/12 h-full justify-center items-center'>
        <Sidebar />
      </div>
      <div className='bg-zinc-900 p-6 w-full h-full'>
        {children}
      </div>
    </div>
  )
}

export default RootLayout
