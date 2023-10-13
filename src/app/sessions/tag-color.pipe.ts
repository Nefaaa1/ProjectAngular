import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tagColor'
})
export class TagColorPipe implements PipeTransform {

  transform(tag: string): string {
    let color: string;
    switch (tag) {
      case 'DELF':
        color = 'vert';
        break;
      case 'DALF':
        color = 'vert';
        break;
      case 'JLPT': 
        color = 'vert';
        break;
      case 'A1':
        color = 'bleu';
        break;
      case 'A2':
        color = 'bleu';
        break;
      case 'B1':
        color = 'bleu';
        break;
      case 'B2':
        color = 'bleu';
        break;
      case 'C1':
        color = 'bleu';
        break;
      case 'C2':
        color = 'bleu';
        break;
      case 'N1':
        color = 'bleu';
        break;
      case 'N2':
        color = 'bleu';
        break;
      case 'N3':
        color = 'bleu';
        break;
      case 'N4':
        color = 'bleu';
        break;
      case 'N5':
        color = 'bleu';
        break;     
      default:
        color = 'bleu';
        break;
    }
    return color;
  }

}
