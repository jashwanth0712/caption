"use client";
import { useState, useCallback, useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { FileIcon, UploadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import FileUploadPopup from "./ui/file-upload-popup";
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

export function FileUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to control popup visibility
  const [sessionTitle, setSessionTitle] = useState("");
  const [sessionType, setSessionType] = useState("public");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const generateUploadUrl = useMutation(api.sessions.generateUploadUrl);
  const addImage = useMutation(api.sessions.updateSession);
  const startSession = useMutation(api.sessions.createSession);

  const handleStartConversation = async (sessionId: any) => {
    try {
      setUploading(true);
      
      // Step 1: Get a short-lived upload URL
      const postUrl = await generateUploadUrl();
      console.log(postUrl);
      let storageIds: any = [];
      // Step 2: Loop through all files and upload them
      const uploadPromises = files.map(async (file) => {
        const result = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        });

        const { storageId } = await result.json();
        storageIds.push(storageId);
        // Step 3: Store the storageId in the database
      });

      // Wait for all files to be uploaded
      await Promise.all(uploadPromises);

      const sessionId = await startSession({
        sessionTitle,
        sessionPassword: sessionType === "private" ? password : "",
        sessionType,
        imageArray: storageIds,
      });
      console.log(sessionId);
      // Reset the files state after all uploads
      setFiles([]);
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setUploading(false);
      setIsPopupOpen(false); // Close the popup after upload
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      // accept only images
      "image/*": [".jpg", ".jpeg", ".png", ".gif"],
    },
    maxSize: 50 * 1024 * 1024, // 50MB
  });

  const handleOpenPopup = () => {
    setIsPopupOpen(true); // Open the popup when button is clicked
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // Close the popup
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const isPasswordValid = password.length === 6 && !isNaN(Number(password));

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
                  <button
                    className="ml-auto text-[#E93A7D] hover:text-[#D62E6C]"
                    onClick={() =>
                      setFiles((prev) => prev.filter((_, i) => i !== index))
                    }
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <p className="mt-4 text-center text-sm text-gray-600">upload to start a new conversation</p>

      {files.length > 0 && !uploading && (
        <Button
          className="mt-4 w-full bg-[#E93A7D] hover:bg-[#D62E6C]"
          onClick={handleOpenPopup}
        >
          <UploadIcon className="mr-2 h-4 w-4" />
          Start Conversation
        </Button>
      )}

      {uploading && (
        <div className="mt-4 w-full">
          <h4 className="mb-2 text-sm font-medium">Uploading...</h4>
          <div className="bg-gray-200 h-2 rounded-md">
            <div className="bg-[#E93A7D] h-2 rounded-md" style={{ width: "50%" }}></div>
          </div>
        </div>
      )}

      {/* Popup/Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Start New Conversation</h2>
            <label className="block mb-2">Session Title</label>
            <input
              type="text"
              value={sessionTitle}
              onChange={(e) => setSessionTitle(e.target.value)}
              className="border w-full p-2 mb-4"
              required
            />
            <label className="block mb-2">Session Type</label>
            <select
              value={sessionType}
              onChange={(e) => setSessionType(e.target.value)}
              className="border w-full p-2 mb-4"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>

            {sessionType === "private" && (
              <>
                <label className="block mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="border w-full p-2 mb-2"
                  pattern="\d{6}"
                  maxLength={6}
                  placeholder="6-digit password"
                />
                <label className="block mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="border w-full p-2 mb-4"
                  pattern="\d{6}"
                  maxLength={6}
                  placeholder="Confirm your password"
                />
                {password !== confirmPassword && password && confirmPassword && (
                  <p className="text-red-500 text-sm">Passwords do not match.</p>
                )}
                {password && !isPasswordValid && (
                  <p className="text-red-500 text-sm">Password must be a 6-digit number.</p>
                )}
              </>
            )}

            <div className="flex justify-between">
              <Button
                onClick={handleClosePopup}
                className="bg-gray-500 text-white hover:bg-gray-600"
              >
                Cancel
              </Button>
              <Button
                onClick={handleStartConversation}
                disabled={
                  !sessionTitle ||
                  (sessionType === "private" &&
                    (!password || password !== confirmPassword || !isPasswordValid))
                }
                className="bg-[#E93A7D] text-white hover:bg-[#D62E6C]"
              >
                Start Conversation
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
