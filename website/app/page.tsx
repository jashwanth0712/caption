import { FileUpload } from "@/components/file-upload"
import { Sidebar } from "@/components/sidebar"

export default function Home() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="flex h-full flex-col items-center justify-center p-6">
          <div className="mb-8 flex items-center">
            <svg className="mr-2 h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#E93A7D" />
              <path d="M2 17L12 22L22 17" fill="#E93A7D" />
              <path d="M2 12L12 17L22 12" fill="#E93A7D" />
            </svg>
            <h1 className="text-2xl font-bold text-[#E93A7D]">Caption</h1>
          </div>
          <FileUpload />
        </div>
      </main>
    </div>
  )
}

