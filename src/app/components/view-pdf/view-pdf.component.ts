import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { PdfGeneratorService } from 'src/app/service/pdf-generator.service';

@Component({
  selector: 'app-view-pdf',
  templateUrl: './view-pdf.component.html',
  styleUrls: ['./view-pdf.component.css']
})
export class ViewPdfComponent implements OnInit {

  constructor(
    public pdfGeneratorService: PdfGeneratorService
  ) {}

  ngOnInit() {

  }
}
