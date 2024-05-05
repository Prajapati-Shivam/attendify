'use client';

import type { QrcodeErrorCallback, QrcodeSuccessCallback } from 'html5-qrcode';
import { Html5QrcodeScanner } from 'html5-qrcode';
import React, { useEffect, useState } from 'react';

const ScanQr = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);

  const [scanner, setScanner] = useState<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    const sc = new Html5QrcodeScanner(
      'reader',
      {
        qrbox: { width: 250, height: 250 },
        fps: 5,
      },
      false,
    );

    setScanner(sc);
  }, []);

  const success: QrcodeSuccessCallback = result => {
    if (scanner) {
      scanner.clear();
      setScanResult(result);
    }
  };

  const error: QrcodeErrorCallback = er => {
    console.log(er, 'er');
  };

  useEffect(() => {
    if (scanner) {
      scanner.render(success, error);
    }
  }, [scanner]);

  return (
    <div className="flex h-[calc(100vh-100px)] w-full flex-col items-center justify-center">
      <div className="flex w-full max-w-md flex-col gap-4">
        <div id="reader"></div>
        {scanResult ? <div>Result: {scanResult}</div> : <div>Not success</div>}
      </div>
    </div>
  );
};

export default ScanQr;
