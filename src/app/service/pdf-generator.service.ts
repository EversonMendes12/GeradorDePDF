import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { PDF } from '../model/pdf';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  public documentUrl?: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer
  ) {
    (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
  }

  generatePdf(pdf: PDF) {
    const documentDefinition = this.getDocumentDefinition(pdf);
    const document = pdfMake.createPdf(documentDefinition);
    document.getBlob((blob: Blob) => {
      const url = URL.createObjectURL(blob);
      // Sanitize the URL here
      this.documentUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    });
  }

  getDocumentDefinition(pdf: PDF) {
    return {
      content: [
        { text: pdf.title, style: 'header' },
        { text: pdf.name, style: 'subHeader' },
        {
          ul: [
            'Item 1',
            'Item 2',
            'Item 3'
          ]
        },
        {
          table: {
            body: [
              ['Column 1', 'Column 2', 'Column 3'],
              [
                {
                  stack: [
                    "Let's try an unordered list",
                    {
                      ul: [
                        'item 1',
                        'item 2'
                      ]
                    }
                  ]
                },
                [
                  'or a nested 5555555555555',
                  {
                    table: {
                      body: [
                        ['Col1', 'Col2', 'Col3'],
                        ['1', '2', '3'],
                        ['1', '2', '3']
                      ]
                    }
                  }
                ],
                {
                  text: [
                    'Inlines can be ',
                    { text: 'styled\n', italics: true },
                    { text: 'easily as everywhere else', fontSize: 10 }
                  ]
                }
              ]
            ]
          },
          style: 'quebraLinha'
        }
      ],      
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          marginBottom: 10
        },
        subHeader: {
          fontSize: 15,
          bold: true,
          marginBottom: 10
        },
        quebraLinha: {
          marginTop: 10
        }
      }
    };
  }
}
