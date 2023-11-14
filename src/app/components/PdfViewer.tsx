import React, { useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { pdfjs } from 'react-pdf';

const PdfViewer: React.FC<{ file: any }> = ({ file }) => {
  return (
    <div className="w-full h-full scale-90">
      <Worker workerUrl={`//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>
        <Viewer
          fileUrl={file}
        />
      </Worker>
    </div>
  );
};

export default PdfViewer;
