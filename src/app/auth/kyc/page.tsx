'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Upload, FileText, X } from 'lucide-react';

export default function KYCUpload() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setUploading(true);
    // Mock upload
    setTimeout(() => {
      setUploading(false);
      router.push('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background_light dark:bg-background_dark">
      <Navbar />
      <main className="pt-16 flex items-center justify-center min-h-screen py-12">
        <div className="max-w-2xl w-full mx-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
              Upload KYC Documents
            </h1>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
              Please upload your identification documents to verify your identity.
              Accepted formats: PDF, JPG, PNG. Max size: 15MB each.
            </p>

            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center mb-6">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Drag and drop files here, or click to select
              </p>
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="bg-primary text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-accent transition-colors"
              >
                Select Files
              </label>
            </div>

            {files.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Selected Files</h3>
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-sm text-gray-900 dark:text-white">{file.name}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                          ({(file.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={files.length === 0 || uploading}
              className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? 'Uploading...' : 'Submit Documents'}
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}