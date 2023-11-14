"use client"

import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { useFile } from '@/store/store';
import PdfViewer from '../components/PdfViewer';
import { Button } from '@/components/ui/button';
import { generateCertificates } from '../../lib/generationScript'
import PdfPreview from '../components/PdfPreview';
import JSZip from 'jszip';
import { useRouter } from 'next/navigation';

const Generate: React.FC<{}> = () => {
    const { file } = useFile();
    const certificateRef = useRef<HTMLDivElement>(null);
    const [sendEmail, setSendEmail] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [list, setList] = useState<any>([]);
    const [generatedFiles, setGeneratedFiles] = useState<Uint8Array[]>([]);

    const router = useRouter();

    const getHeight = () => {
        console.log(certificateRef.current?.clientHeight);
    };


    useEffect(() => {
        getHeight();
    }, []);

    const handleEmailToggle = () => {
        setSendEmail((prev) => !prev);
    };

    const handleAdd = () => {
        let data;
        if (sendEmail) {
            data = { name: name, email: email };
        } else {
            data = { name: name };
        }

        const arr = list;
        arr.push(data);
        setList(arr);

        setName('');
        setEmail('');
    };


    const handleGenerate = async () => {
        if (file === null) {
            return;
        }
        const output = await generateCertificates(list, file);
        setGeneratedFiles(output);
    };

    const handleDownloadAll = async () => {
        if (generatedFiles.length === 0) {
            return;
        }

        const zip = new JSZip();

        for (let i = 0; i < generatedFiles.length; i++) {
            const fileName = `certificate_${i + 1}.pdf`;
            zip.file(fileName, generatedFiles[i]);
        }

        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(zipBlob);
        link.download = 'certificates.zip';
        link.click();
    };

    return (
        <div className=' scrollbar-hide' >
            {
                file ? <>
                    <div className="flex w-full h-[100vh] px-2 relative ">
                        <div className="w-[70%] h-full relative" ref={certificateRef}>
                            {/* Your PdfViewer component */}
                            <PdfViewer file={file} />
                        </div>
                        <div className="w-[30%] overflow-x-scroll scrollbar-hide bg-transparent border-[1px] border-primary border-dotted rounded-2xl filter bg-opacity-20 backdrop-blur-3xl p-4">
                            <h2 className="text-xl font-bold text-white">Certificate Generation Toolbox</h2>

                            {/* Email Toggler */}
                            <div className="flex items-center mt-4">
                                <label className="mr-2 text-white">Send Email:</label>
                                <input type="checkbox" checked={sendEmail} onChange={handleEmailToggle} />
                            </div>

                            {!sendEmail && (
                                <div className="mt-4">
                                    <label className="block mb-2 text-white">Name:</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                                        placeholder="Enter name"
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                            )}

                            <div className="flex flex-col gap-2">
                                <Button className="bg-primary mt-[1rem] text-xs" onClick={handleAdd}>
                                    Add Receiver
                                </Button>

                                <Button className=" bg-blue-500 mt-[1rem] text-xs" onClick={handleGenerate}>
                                    Generate
                                </Button>

                                {generatedFiles.length > 0 && (
                                    <Button className=" bg-green-500 mt-[1rem] text-xs" onClick={handleDownloadAll}>
                                        Download All
                                    </Button>
                                )}
                            </div>

                            <div className="mt-[1rem] text-white">
                                <h3 className="text-white">List of Receivers:</h3>
                                <div className="p-1 border-white border-[1px] mt-[1rem]">
                                    {list.length !== 0 && (
                                        <>
                                            {list.map((item: any, index: number) => (
                                                <div  className={`${index % 2 === 0 ? 'bg-transparent' : 'bg-gray-700'}`} key={index}>
                                                    {sendEmail ? `${item.name} ${item.email}` : item.name}
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </div>
                            </div>


                        </div>


                    </div>

                    <div className="mt-[1rem] text-white p-8">
                        <h3 className="text-white">Generated Files:</h3>
                        <div className="p-2 border-white border-[1px] mt-[1rem] grid grid-cols-3 gap-4">
                            {generatedFiles.length !== 0 && (
                                <>
                                    {generatedFiles.map((file, index) => (
                                        <div key={index}>
                                            <PdfPreview file={file} />
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                </> : <>
                    <div className='w-screen h-screen flex items-center justify-center scrollbar-hide overflow-x-hidden'>
                        <Button className='p-2 bg-primary' onClick={() => router.back()}>Go Back and Select File</Button>
                    </div>
                </>
            }
        </div>

    );
};

export default Generate;
