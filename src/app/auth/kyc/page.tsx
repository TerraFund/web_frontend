'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, FileText, X, CheckCircle, Loader2 } from 'lucide-react';

export default function KYCUpload() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    addFiles(selectedFiles);
  };

  const addFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter(file => {
      const isValidType = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'].includes(file.type);
      const isValidSize = file.size <= 15 * 1024 * 1024; // 15MB
      return isValidType && isValidSize;
    });

    if (validFiles.length !== newFiles.length) {
      alert('Some files were rejected. Please ensure files are PDF, JPG, or PNG and under 15MB.');
    }

    setFiles(prev => [...prev, ...validFiles]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setUploading(true);
    const progress: { [key: string]: number } = {};

    // Simulate upload progress for each file
    files.forEach((file, index) => {
      progress[file.name] = 0;
      const interval = setInterval(() => {
        progress[file.name] += Math.random() * 30;
        if (progress[file.name] >= 100) {
          progress[file.name] = 100;
          clearInterval(interval);
          setUploadedFiles(prev => [...prev, file.name]);
        }
        setUploadProgress({ ...progress });
      }, 200);
    });

    // Complete upload after all files are done
    setTimeout(() => {
      setUploading(false);
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    }, 3000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-12">
      <div className="max-w-2xl w-full mx-4">
          <div className="bg-white">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-900">
              Upload KYC Documents
            </h1>
            <p className="text-center text-gray-600">
              Please upload your identification documents to verify your identity.
              Accepted formats: PDF, JPG, PNG. Max size: 15MB each.
            </p>

            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 transition-all duration-200 ${
                isDragOver
                  ? 'border-primary bg-primary/5 scale-105'
                  : 'border-gray-300
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className={`mx-auto h-12 w-12 mb-4 transition-colors ${isDragOver ? 'text-primary' : 'text-gray-400
              <p className="text-gray-600">
                {isDragOver ? 'Drop files here' : 'Drag and drop files here, or click to select'}
              </p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="bg-primary text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-accent transition-all duration-200 hover:scale-105 inline-block"
              >
                Select Files
              </label>
            </div>

            {files.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Selected Files</h3>
                <div className="space-y-3">
                  {files.map((file, index) => {
                    const progress = uploadProgress[file.name] || 0;
                    const isUploaded = uploadedFiles.includes(file.name);

                    return (
                      <div key={index} className="bg-gray-50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            {isUploaded ? (
                              <CheckCircle className="h-5 w-5 text-green-500 mr-3 animate-in zoom-in duration-300" />
                            ) : (
                              <FileText className="h-5 w-5 text-gray-400" />
                            )}
                            <span className="text-sm text-gray-900">{file.name}</span>
                            <span className="text-xs text-gray-500">
                              ({(file.size / 1024 / 1024).toFixed(2)} MB)
                            </span>
                          </div>
                          {!uploading && !isUploaded && (
                            <button
                              onClick={() => removeFile(index)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          )}
                        </div>

                        {uploading && !isUploaded && (
                          <div className="mt-2">
                            <div className="flex items-center justify-between text-xs text-gray-600">
                              <span>Uploading...</span>
                              <span>{Math.round(progress)}%</span>
                            </div>
                            <div className="w-full bg-gray-200">
                              <div
                                className="bg-primary h-2 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {isUploaded && (
                          <div className="mt-2 text-xs text-green-600">
                            ✓ Upload successful
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={files.length === 0 || uploading}
              className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-accent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Uploading Documents...
                </>
              ) : uploadedFiles.length === files.length && files.length > 0 ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2 animate-in zoom-in duration-300" />
                  All Documents Submitted
                </>
              ) : (
                'Submit Documents'
              )}
            </button>
          </div>
      </div>
    </div>
  );
}