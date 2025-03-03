'use client'
 
import { Sidebar } from '@/components/sidebar'
import { useSearchParams } from 'next/navigation'
 
export default function SearchBar() {
  const searchParams = useSearchParams()
 
  const search = searchParams.get('id')
 
  return 
    <div className="flex h-screen w-full overflow-hidden">

    <Sidebar/>
    
  </div>
  
}