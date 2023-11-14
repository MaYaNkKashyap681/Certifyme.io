"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import React from 'react';
import PdfViewer from '../components/PdfViewer';
import Link from 'next/link';

import { useFile } from '@/store/store';

const CertificatePage = () => {
    // const [file, setFile] = useState<any | null>(null);
    // const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

    const { file, setFile } = useFile();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(URL.createObjectURL(file));
        }
    };

    return (
        <div className='text-white p-8'>
            <div className='border-[2px] rounded-2xl border-primary border-dotted min-h-[30rem] flex flex-col items-center justify-center p-4'>
                {!file ? (
                    <>
                        <h4 className='relative w-fit px-3 py-1 text-sm font-medium inline-flex items-center justify-center border border-transparent rounded-full text-zinc-300 hover:text-white transition duration-150 ease-in-out group [background:linear-gradient(theme(colors.primary.900),_theme(colors.primary.900))_padding-box,_conic-gradient(theme(colors.primary.400),_theme(colors.primary.700)_25%,_theme(colors.primary.700)_75%,_theme(colors.primary.400)_100%)_border-box] before:absolute before:inset-0 before:bg-zinc-800/30 before:rounded-full before:pointer-events-none cursor-pointer'>
                            Select The Certificate Template of Your Choice
                        </h4>
                        <>
                            <label htmlFor='imageInput' className='flex items-center justify-center w-[12rem] bg-primary mt-[1rem] rounded-xl p-4 hover:bg-primary hover:bg-opacity-80 cursor-pointer'>
                                Select File
                            </label>
                            <input type='file' id='imageInput' className='hidden' onChange={handleFileChange} />
                        </>
                    </>
                ) : (
                    <div className='w-full flex flex-col items-center'>
                        <PdfViewer file={file} />

                        <div className='flex items-center justify-center gap-4'>
                            <div className='mt-[1rem] p-2 bg-primary text-white text-sm rounded-md cursor-pointer' onClick={() => setFile(null)}>
                                Select Another
                            </div>
                            <Link href="/generate">
                                <div className='mt-[1rem] p-2 bg-primary text-white text-sm rounded-md cursor-pointer'>
                                    Continue
                                </div>
                            </Link>
                        </div>
                    </div>
                )}


            </div>
        </div>
    );
};

export default CertificatePage;
