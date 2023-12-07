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
      return employee.first_name && employee.last_name.toLowerCase().includes(searchText);
    });
  }

}
