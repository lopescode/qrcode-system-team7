import { Sidebar } from '@/components/Sidebar'
import { Navbar } from '@/components/Navbar'

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="flex flex-col bg-black h-screen w-screen">
      <div className='flex'>
        <div className='w-1/12'></div>
        <Navbar />
      </div>
      <div className='flex h-screen'>
        <div className='w-1/12'>
          <Sidebar />
        </div>
        <div className='bg-zinc-900 p-6 w-full'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default RootLayout
