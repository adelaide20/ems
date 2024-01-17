import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(employees: any[], searchText: string): any[] {
    if (!employees || !searchText) {
      return employees;
    }

    searchText = searchText.toLowerCase();

    return employees.filter(employee => {
      const first = employee.first_name.toLowerCase().includes(searchText);
      const last = employee.last_name.toLowerCase().includes(searchText);

      return first + last;
    });
  }

}
