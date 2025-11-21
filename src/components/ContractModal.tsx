'use client';

import { useState, useRef } from 'react';
import { useUI } from '@/hooks/useUI';
import Button from './Button';

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
      onSign(signature);
      setLoading(false);
      closeModal();
    }, 1000);
  };

  return (
    <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Contract Agreement
      </h2>

      <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Terms and Conditions
        </h3>
        <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line max-h-60 overflow-y-auto">
          {contractTerms}
        </div>
      </div>

      <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Digital Signature
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Please sign below using your mouse or touch device.
        </p>

        <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-gray-800">
          <canvas
            ref={canvasRef}
            width={400}
            height={200}
            className="border border-gray-200 dark:border-gray-600 rounded cursor-crosshair w-full"
            style={{ touchAction: 'none' }}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
        </div>

        <div className="flex justify-end mt-4">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={clearSignature}
          >
            Clear Signature
          </Button>
        </div>
      </div>

      <div className="flex space-x-3">
        <Button
          type="button"
          variant="outline"
          onClick={closeModal}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="button"
          onClick={handleSign}
          loading={loading}
          className="flex-1"
        >
          Sign Contract
        </Button>
      </div>
    </div>
  );
}