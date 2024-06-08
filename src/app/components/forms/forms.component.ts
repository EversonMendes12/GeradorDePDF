import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PdfGeneratorService } from 'src/app/service/pdf-generator.service';
import { Router } from '@angular/router';
import { PDF } from 'src/app/model/pdf';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent {

  public tileForm = new FormControl<string>('');
  public nameForm = new FormControl<string>('');

  public form = new FormGroup({
    title: this.tileForm,
    name: this.nameForm
  });

  constructor(
    private pdfGenerator: PdfGeneratorService,
    private router: Router
  ) {}

  public onGerarPdf() {
    const pdf: PDF = {
      title: this.form.value.title || '',
      name: this.form.value.name || '',
    };
    const pdfDocGenerator = this.pdfGenerator.generatePdf(pdf);
  }
}
