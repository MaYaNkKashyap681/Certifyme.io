import React, { useState, useEffect } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { pdfjs } from 'react-pdf';
import '@react-pdf-viewer/core/lib/styles/index.css';

interface PdfPreviewProps {
  file: Uint8Array;
}

const PdfPreview: React.FC<PdfPreviewProps> = ({ file }) => {
  const [pdfUrl, setPdfUrl] = useState<string | Uint8Array>('');

  useEffect(() => {
    const blob = new Blob([file], { type: 'application/pdf' });
    const pdfBlobUrl = URL.createObjectURL(blob);
    setPdfUrl(pdfBlobUrl);

    return () => URL.revokeObjectURL(pdfBlobUrl);
  }, [file]);

  return (
    <div style={{ height: '' }}>
        <Worker workerUrl={`//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>
        <Viewer fileUrl={pdfUrl} />
      </Worker>
    </div>
  );
};

export default PdfPreview;
