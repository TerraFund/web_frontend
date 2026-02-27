'use client';

import { useState, useRef, useEffect } from 'react';
import { useUI } from '@/hooks/useUI';
import Button from './Button';
import { CheckCircle, FileText, PenTool } from 'lucide-react';

interface ContractModalProps {
  contractId: string;
  contractTerms: string;
  onSign: (signature: string) => void;
}

export default function ContractModal({ contractId, contractTerms, onSign }: ContractModalProps) {
  const { closeModal } = useUI();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set up canvas for smooth drawing
    ctx.strokeStyle = '#0B6E4F';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSign = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setLoading(true);

    // Mock signature capture
    const signature = canvas.toDataURL();

    setTimeout(() => {
      setShowSuccess(true);
      setTimeout(() => {
        onSign(signature);
        setLoading(false);
        closeModal();
      }, 1500);
    }, 1000);
  };

  return (
    <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300">
      <div className="flex items-center mb-6">
        <FileText className="w-8 h-8 text-primary mr-3" />
        <h2 className="text-2xl font-bold text-foreground">
          Contract Agreement
        </h2>
      </div>

      <div className="bg-muted">
        <h3 className="text-lg font-semibold text-foreground">
          Terms and Conditions
        </h3>
        <div className="text-sm text-foreground/80">
          {contractTerms}
        </div>
      </div>

      <div className="border border-border">
        <div className="flex items-center mb-4">
          <PenTool className="w-5 h-5 text-primary mr-2" />
          <h3 className="text-lg font-semibold text-foreground">
            Digital Signature
          </h3>
          {hasSignature && (
            <CheckCircle className="w-5 h-5 text-green-500 ml-2 animate-in zoom-in duration-300" />
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Please sign below using your mouse or touch device. Your signature will be legally binding.
        </p>

        <div className={`border-2 rounded-lg p-4 bg-card
          isDrawing ? 'border-primary shadow-lg' : 'border-border
        }`}>
          <canvas
            ref={canvasRef}
            width={400}
            height={200}
            className={`rounded cursor-crosshair w-full transition-all duration-200 ${
              isDrawing ? 'shadow-inner' : ''
            }`}
            style={{ touchAction: 'none' }}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
          {!hasSignature && (
            <div className="absolute inset-4 flex items-center justify-center pointer-events-none">
              <p className="text-muted-foreground">Sign here</p>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-4">
          <p className="text-xs text-muted-foreground">
            {hasSignature ? '✓ Signature captured' : 'Please provide your signature'}
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={clearSignature}
            className="hover:scale-105 transition-transform duration-200"
          >
            Clear Signature
          </Button>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-in fade-in duration-300">
          <div className="bg-card">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground">
              Contract Signed Successfully!
            </h3>
            <p className="text-muted-foreground">
              Your digital signature has been recorded and the contract is now legally binding.
            </p>
          </div>
        </div>
      )}

      <div className="flex space-x-3">
        <Button
          type="button"
          variant="outline"
          onClick={closeModal}
          className="flex-1 hover:scale-105 transition-transform duration-200"
        >
          Cancel
        </Button>
        <Button
          type="button"
          onClick={handleSign}
          loading={loading}
          disabled={!hasSignature}
          className="flex-1 hover:scale-105 transition-transform duration-200"
        >
          {loading ? 'Signing Contract...' : 'Sign Contract'}
        </Button>
      </div>
    </div>
  );
}