"use client"

import axios from "axios";
import { PDFDocument } from "pdf-lib";
import { off } from "process";



const blobToBase64 = async (blob: Blob): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64String = reader.result as string;
            resolve(base64String.split(',')[1]); // Extract the base64 part from the data URI
        };

        reader.onerror = (error) => {
            reject(error);
        };

        reader.readAsDataURL(blob);
    });
};

const loadPdfAsBase64 = async (pdfPath: string) => {
    try {
        const response = await axios.get(pdfPath, { responseType: 'arraybuffer' });
        const base64String = await blobToBase64(new Blob([response.data]));
        return base64String;
    } catch (error) {
        console.error('Error loading PDF:', error);
        throw error;
    }
};


class CertificateNameWriter {
    private pdfPath: string;
    private index: number;
    private offset: number

    constructor(pdfFile: string, index: number, offset: number) {
        console.log(pdfFile);
        this.pdfPath = pdfFile;
        this.index = index;
        this.offset = offset
    }

    async loadPdf() {
        const base64String = await loadPdfAsBase64(this.pdfPath);
        const pdfDoc = await PDFDocument.load(base64String);
        return pdfDoc;
    }

    async modifier(receiver_name: string) {
        const pdfDoc = await this.loadPdf();
        const [firstPage] = pdfDoc.getPages();

        const { width, height } = firstPage.getSize();


        const fontSize = 40;
        const textWidth = receiver_name.length * (fontSize / 2);
        const x = (width - textWidth) / 2;
        firstPage.drawText(`${receiver_name}`, {
            x,
            y: height - ((height / 12 * (this.index)) + this.offset),
            size: fontSize,
        });

        const modifiedPdfBytes = await pdfDoc.save();
        return modifiedPdfBytes;
    }

    async multiCertificateGenerator(list_of_receivers: string[]) {
        const modifiedPdfs: Uint8Array[] = [];
        for (const name of list_of_receivers) {
            const modifiedPdf = await this.modifier(name);
            modifiedPdfs.push(modifiedPdf);
        }
        return modifiedPdfs;
    }
}

interface CertificateFields {
    name: string;
}

export const generateCertificates = async (nameList: CertificateFields[], pdfFile: string, index: number = 0, offset: number = 0) => {
    const nameOfRecivers = nameList.map((item) => item.name);
    const modifierObj = new CertificateNameWriter(pdfFile, index, offset);

    const modifiedPdfs = await modifierObj.multiCertificateGenerator(nameOfRecivers);
    return modifiedPdfs;
};



