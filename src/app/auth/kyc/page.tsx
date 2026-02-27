'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, X, FileText, CheckCircle, Loader2, Leaf, Shield } from 'lucide-react';

export default function KYCPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<number, number>>({});
  const [isDragOver, setIsDragOver] = useState(false);
  const [success, setSuccess] = useState(false);

  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const dropped = Array.from(e.dataTransfer.files).filter((f) => allowedTypes.includes(f.type));
    setFiles((prev) => [...prev, ...dropped]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files).filter((f) => allowedTypes.includes(f.type));
      setFiles((prev) => [...prev, ...selected]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    setUploading(true);
    // Simulate upload with progress
    for (let i = 0; i < files.length; i++) {
      for (let p = 0; p <= 100; p += 10) {
        setUploadProgress((prev) => ({ ...prev, [i]: p }));
        await new Promise((r) => setTimeout(r, 100));
      }
    }
    setSuccess(true);
    setTimeout(() => router.push('/dashboard'), 2500);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-8">
        <div className="text-center space-y-6 fade-in-up">
          <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Documents Uploaded!</h2>
          <p className="text-muted-foreground">Your KYC documents are being verified. Redirecting to dashboard...</p>
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-2xl space-y-8 fade-in-up">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center gap-2 justify-center">
            <Leaf className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">TerraFund</span>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Verify Your Identity</h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Upload your KYC documents to complete your registration. We accept government-issued IDs and proof of address.
            </p>
          </div>
        </div>

        {/* Upload Card */}
        <div className="bg-card rounded-2xl border border-border shadow-lg p-8 space-y-6">
          {/* Dropzone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-300 ${
              isDragOver
                ? 'border-accent bg-accent/5 scale-[1.02]'
                : 'border-border hover:border-primary hover:bg-primary/5'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileSelect}
              className="hidden"
            />
            <div className="space-y-3">
              <div className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center transition-colors ${
                isDragOver ? 'bg-accent/20 text-accent' : 'bg-primary/10 text-primary'
              }`}>
                <Upload className="h-7 w-7" />
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  {isDragOver ? 'Drop files here' : 'Drag & drop files or click to browse'}
                </p>
                <p className="text-sm text-muted-foreground mt-1">PDF, JPG, PNG up to 15MB each</p>
              </div>
            </div>
          </div>

          {/* File list */}
          {files.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">
                Selected Files ({files.length})
              </h3>
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{formatSize(file.size)}</p>
                    {uploading && uploadProgress[index] !== undefined && (
                      <div className="mt-2 h-1.5 rounded-full bg-border overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary transition-all duration-300"
                          style={{ width: `${uploadProgress[index]}%` }}
                        />
                      </div>
                    )}
                  </div>
                  {!uploading && (
                    <button
                      onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                  {uploading && uploadProgress[index] === 100 && (
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Upload button */}
          <button
            onClick={handleUpload}
            disabled={files.length === 0 || uploading}
            className="w-full py-3.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {uploading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Uploading documents...
              </>
            ) : (
              <>
                <Shield className="h-5 w-5" />
                Upload & Verify
              </>
            )}
          </button>

          {/* Security note */}
          <p className="text-xs text-center text-muted-foreground">
            🔒 Your documents are encrypted and stored securely. We comply with international data protection regulations.
          </p>
        </div>
      </div>
    </div>
  );
}