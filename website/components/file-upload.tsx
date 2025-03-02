"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { FileIcon, UploadIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FileUpload() {
  const [files, setFiles] = useState<File[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxSize: 50 * 1024 * 1024, // 50MB
  })

  return (
    <div className="w-full max-w-md">
      <div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-[#FFFDF7] p-12 text-center transition-colors ${
          isDragActive ? "border-[#E93A7D] bg-[#FFFDF7]" : ""
        }`}
      >
        <input {...getInputProps()} />
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg">
          <FileIcon className="h-12 w-12 text-[#2A9D8F]" />
        </div>
        <h3 className="mb-2 text-lg font-medium">
          Drop your file(s) here, or <span className="text-[#2A9D8F]">Browse</span>
        </h3>
        <p className="text-sm text-gray-500">Supports: pdf, Max file size 50MB</p>

        {files.length > 0 && (
          <div className="mt-4 w-full">
            <h4 className="mb-2 text-sm font-medium">Selected files:</h4>
            <ul className="max-h-32 overflow-auto rounded-md border border-gray-200 bg-white p-2">
              {files.map((file, index) => (
                <li key={index} className="flex items-center py-1 text-sm">
                  <FileIcon className="mr-2 h-4 w-4" />
                  {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <p className="mt-4 text-center text-sm text-gray-600">upload to start a new conversation</p>

      {files.length > 0 && (
        <Button className="mt-4 w-full bg-[#E93A7D] hover:bg-[#D62E6C]">
          <UploadIcon className="mr-2 h-4 w-4" />
          Start Conversation
        </Button>
      )}
    </div>
  )
}

