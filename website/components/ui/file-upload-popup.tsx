"use client"

import { useState } from "react"
import { X, Upload, Lock, Eye, ArrowRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

interface FileItem {
  id: string
  name: string
  size: string
  type: string
}

export default function FileUploadPopup() {
  const [step, setStep] = useState(1)
  const [files, setFiles] = useState<FileItem[]>([
    { id: "1", name: "vacation-photo.jpg", size: "2.4 MB", type: "image/jpeg" },
    { id: "2", name: "screenshot.png", size: "1.2 MB", type: "image/png" },
  ])
  const [isPrivate, setIsPrivate] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [progress, setProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileRemove = (id: string) => {
    setFiles(files.filter((file) => file.id !== id))
  }

  const handleAddMoreFiles = () => {
    // In a real implementation, this would open a file picker
    const newId = String(Date.now())
    setFiles([
      ...files,
      {
        id: newId,
        name: `new-image-${newId}.jpg`,
        size: "3.1 MB",
        type: "image/jpeg",
      },
    ])
  }

  const handleContinue = () => {
    if (step === 1) {
      setStep(2)
    } else if (step === 2) {
      if (isPrivate && (password !== confirmPassword || password.length !== 6)) {
        // Show error in a real implementation
        return
      }
      setStep(3)
      setIsUploading(true)

      // Simulate upload progress
      let currentProgress = 0
      const interval = setInterval(() => {
        currentProgress += 5
        setProgress(currentProgress)

        if (currentProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsUploading(false)
            // In a real implementation, you would close the popup here
          }, 500)
        }
      }, 100)
    }
  }

  const isStepComplete = (stepNumber: number) => {
    return step > stepNumber
  }

  const isStepActive = (stepNumber: number) => {
    return step === stepNumber
  }

  return (
    <div className="fixed inset-0  flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Upload Files</h2>
            <button className="text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Stepper Progress Bar */}
          <div className="flex items-center">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center flex-1">
                <div
                  className={`rounded-full h-4 w-4 flex items-center justify-center ${
                    isStepComplete(stepNumber)
                      ? "bg-green-500"
                      : isStepActive(stepNumber)
                        ? "bg-blue-500"
                        : "bg-gray-200"
                  }`}
                >
                  {isStepComplete(stepNumber) && <div className="h-2 w-2 rounded-full bg-white" />}
                </div>

                {stepNumber < 4 && (
                  <div className={`h-0.5 flex-1 ${isStepComplete(stepNumber) ? "bg-green-500" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
        </CardHeader>

        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Selected Files</h3>
                <Button variant="outline" size="sm" onClick={handleAddMoreFiles} className="flex items-center gap-1">
                  <Plus className="h-4 w-4" />
                  Add More
                </Button>
              </div>

              <div className="border rounded-lg divide-y">
                {files.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded">
                        <Upload className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-gray-500">{file.size}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleFileRemove(file.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                {files.length === 0 && <div className="p-4 text-center text-gray-500">No files selected</div>}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Privacy Settings</h3>
                <p className="text-sm text-gray-500">
                  Choose whether your files will be publicly accessible or password protected.
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isPrivate ? <Lock className="h-5 w-5 text-blue-500" /> : <Eye className="h-5 w-5 text-blue-500" />}
                  <span className="font-medium">{isPrivate ? "Private (Password Protected)" : "Public"}</span>
                </div>
                <Switch  checked={isPrivate} onCheckedChange={setIsPrivate} />
              </div>

              {isPrivate && (
                <div className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <Label htmlFor="password">6-Digit Password</Label>
                    <div className="grid grid-cols-6 gap-2">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <Input
                          key={i}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          className="text-center"
                          value={password[i] || ""}
                          onChange={(e) => {
                            const newPassword = password.split("")
                            newPassword[i] = e.target.value
                            setPassword(newPassword.join(""))

                            // Auto-focus next input
                            if (e.target.value && i < 5) {
                              const nextInput = e.target.parentElement?.nextElementSibling?.querySelector("input")
                              if (nextInput) nextInput.focus()
                            }
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="grid grid-cols-6 gap-2">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <Input
                          key={i}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          className="text-center"
                          value={confirmPassword[i] || ""}
                          onChange={(e) => {
                            const newConfirmPassword = confirmPassword.split("")
                            newConfirmPassword[i] = e.target.value
                            setConfirmPassword(newConfirmPassword.join(""))

                            // Auto-focus next input
                            if (e.target.value && i < 5) {
                              const nextInput = e.target.parentElement?.nextElementSibling?.querySelector("input")
                              if (nextInput) nextInput.focus()
                            }
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {password && confirmPassword && password !== confirmPassword && (
                    <p className="text-sm text-red-500">Passwords do not match</p>
                  )}
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 py-6">
              <h3 className="text-lg font-medium text-center">
                {progress < 100 ? "Uploading Files..." : "Upload Complete!"}
              </h3>
              <Progress value={progress} className="h-2" />
              <p className="text-center text-sm text-gray-500">
                {progress < 100
                  ? `Uploading ${files.length} files (${progress}%)`
                  : "All files have been uploaded successfully"}
              </p>
            </div>
          )}
        </CardContent>

        {(step === 1 || step === 2) && (
          <CardFooter className="flex justify-end">
            <Button
              onClick={handleContinue}
              disabled={
                files.length === 0 ||
                (step === 2 && isPrivate && (password.length !== 6 || password !== confirmPassword))
              }
              className="flex items-center gap-1"
            >
              Continue
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

