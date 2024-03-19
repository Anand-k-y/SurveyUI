import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapType'
})
export class MapTypePipe implements PipeTransform {

  transform(input: string): string {
    const nodeTypeHash: { [key: string]: string } = {
      '': '',
      'FEEDER': 'FEEDER',
      'DT': 'DT',
      'GATEWAY': 'GATEWAY',
      'METER': 'METER'
    };

    return nodeTypeHash[input] || '';
  }

}
