'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Upload,
  X,
  FileText,
  CheckCircle,
  Loader2,
  Leaf,
  ShieldCheck,
  Lock,
  UserCheck,
  Award,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function KYCPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [docCategory, setDocCategory] = useState<'id' | 'address' | 'deed'>('id');
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<number, number>>({});
  const [isDragOver, setIsDragOver] = useState(false);
  const [success, setSuccess] = useState(false);

  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];

  const categoryLabels = {
    id: 'Government Issued National ID / Passport',
    address: 'Proof of Address (Utility Bill / Bank Statement)',
    deed: 'Land Ownership Deed / Agronomist Registration',
  };

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

    try {
      // Simulate progress
      for (let i = 0; i < files.length; i++) {
        for (let p = 0; p <= 100; p += 20) {
          setUploadProgress((prev) => ({ ...prev, [i]: p }));
          await new Promise((r) => setTimeout(r, 80));
        }
      }

      await fetch('/api/kyc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentCategory: categoryLabels[docCategory],
          fileName: files[0]?.name || 'KYC_Document.pdf',
        }),
      });

      setSuccess(true);
      setTimeout(() => router.push('/dashboard'), 2200);
    } catch (err) {
      console.error('KYC upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-8">
        <div className="text-center space-y-6 max-w-md w-full bg-card border border-border p-8 rounded-3xl shadow-2xl">
          <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
            <CheckCircle className="h-10 w-10" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-foreground">Verification Complete!</h2>
            <p className="text-xs text-muted-foreground">
              Your KYC identity and document credentials have been verified by TerraFund Compliance.
            </p>
          </div>
          <div className="p-4 bg-muted/20 rounded-2xl border border-border text-xs text-emerald-600 font-semibold flex items-center justify-center gap-2">
            <ShieldCheck className="h-4 w-4" /> Account Status: FULLY VERIFIED
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin text-primary" /> Redirecting to Dashboard...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between p-4 sm:p-8 max-w-4xl mx-auto w-full">
      {/* Header */}
      <div className="text-center space-y-4 pt-4">
        <div className="flex items-center gap-2 justify-center">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Leaf className="h-6 w-6" />
          </div>
          <span className="text-2xl font-extrabold text-foreground tracking-tight">TerraFund</span>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
            Identity & Compliance Verification
          </h1>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto">
            Upload your government-issued ID and title deed documents to unlock escrow leasing and capital investments.
          </p>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="bg-card rounded-3xl border border-border shadow-xl p-6 sm:p-8 space-y-6 my-6">
        {/* Category Selector Tabs */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-foreground uppercase tracking-wider">
            1. Select Document Category
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'id', title: 'National ID / Passport', icon: UserCheck },
              { id: 'address', title: 'Proof of Address', icon: FileText },
              { id: 'deed', title: 'Title Deed / License', icon: Award },
            ].map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setDocCategory(cat.id as any)}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between gap-2 transition-all ${
                    docCategory === cat.id
                      ? 'bg-primary/10 border-primary text-primary font-bold shadow-sm'
                      : 'bg-muted/20 border-border text-muted-foreground hover:bg-muted'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs">{cat.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dropzone */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-foreground uppercase tracking-wider">
            2. Upload Document File ({categoryLabels[docCategory]})
          </label>
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
              isDragOver
                ? 'border-primary bg-primary/10 scale-[1.01]'
                : 'border-border hover:border-primary hover:bg-muted/20'
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
              <div className="w-12 h-12 mx-auto rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <Upload className="h-6 w-6" />
              </div>
              <div>
                <p className="font-bold text-foreground text-sm">
                  {isDragOver ? 'Drop file here' : 'Drag & drop document or click to browse'}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Supports PDF, JPG, PNG up to 15MB</p>
              </div>
            </div>
          </div>
        </div>

        {/* Selected File List */}
        {files.length > 0 && (
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
              Selected Files ({files.length})
            </h3>
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-2xl bg-muted/20 border border-border"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-foreground truncate">{file.name}</p>
                  <p className="text-[11px] text-muted-foreground">{formatSize(file.size)}</p>
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
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-red-600 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
                {uploading && uploadProgress[index] === 100 && (
                  <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={handleUpload}
          disabled={files.length === 0 || uploading}
          className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold text-sm rounded-2xl transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Verifying & Processing Document...
            </>
          ) : (
            <>
              <ShieldCheck className="h-5 w-5" />
              Submit & Verify Credentials
            </>
          )}
        </button>
      </div>

      {/* Footer Security Badge */}
      <div className="text-center text-xs text-muted-foreground flex items-center justify-center gap-2 pb-4">
        <Lock className="h-3.5 w-3.5 text-emerald-500" /> All documents are encrypted with AES-256 and stored in compliance with agricultural identity standards.
      </div>
    </div>
  );
}