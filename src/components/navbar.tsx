import { Heart } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from './ui/button'

const Navbar = () => {
  return (
    <div className='sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-200 bg-[#FCF3E4]/75 backdrop-blur-lg'>
      <div className='max-w-7xl mx-auto lg:px-8 px-6'>
        <div className='relative flex h-14 items-center justify-between'>
        <Link href='/' className='flex z-40 font-semibold'>
            verbavo<span className='text-[#65372A]'>api</span>
          </Link>



          {/* placeholder */}
          <div className='hidden sm:block invisible'>ProfanityAPI</div>

          <div className='hidden sm:flex items-center gap-6'>
            <Link className='hover:underline' href='#video-demo'>
              Video Demo
            </Link>
            <Link className='hover:underline' href='#api'>
              API
            </Link>
          </div>

         
        </div>
      </div>
    </div>
  )
}

export default Navbar