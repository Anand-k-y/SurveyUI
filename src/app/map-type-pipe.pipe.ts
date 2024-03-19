import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapTypePipe'
})
export class MapTypePipePipe implements PipeTransform {

  private nodeTypeHash: { [key: string]: string } = {
    '': '',
    'FEEDER': 'FEEDER',
    'DT': 'DT',
    'GATEWAY': 'GATEWAY',
    'METER': 'METER'
  };

  transform(input: string): string {
    if (!input) {
      return '';
    } else {
      return this.nodeTypeHash[input] || '';
    }
  }

}
