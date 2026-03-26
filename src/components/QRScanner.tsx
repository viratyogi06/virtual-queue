import { useState } from 'react';
import { Card, Button, Input } from '@/components/ui';

export interface QRScannerProps {
  onScan: (code: string) => void;
}

export function QRScanner({ onScan }: QRScannerProps) {
  const [code, setCode] = useState<string>('');

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    const trimmed = code.trim();
    if (trimmed === '') return;
    onScan(trimmed);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Camera Placeholder */}
      <div className="relative h-56 rounded-2xl bg-gray-200 overflow-hidden flex items-center justify-center">
        {/* Corner brackets */}
        <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-white rounded-tl" />
        <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-white rounded-tr" />
        <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-white rounded-bl" />
        <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-white rounded-br" />

        {/* Center content */}
        <div className="flex flex-col items-center gap-2 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
          <p className="text-sm text-gray-500">Point your camera at a QR code</p>
        </div>
      </div>

      {/* Manual Code Entry */}
      <Card padding="md">
        <p className="text-sm font-medium text-gray-700 mb-3">Or enter a code manually</p>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <Input
              placeholder="Provider code (e.g. 1–5)"
              value={code}
              onChange={setCode}
              className="flex-1"
            />
            <Button type="submit" variant="primary" size="sm">
              Go
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
