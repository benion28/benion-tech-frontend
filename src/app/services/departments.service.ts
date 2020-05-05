import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {
  departmentList: AngularFireList<any>;
  array = [];

  constructor(private firebase: AngularFireDatabase) {
    this.departmentList = this.firebase.list('departments');
    this.departmentList.snapshotChanges().subscribe(list => {
      this.array = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
    });
  }

  departments = [
    {
      id: 'd0',
      code: 'CSE',
      name: 'Computer Software Engineering'
    },
    {
      id: 'd1',
      code: 'CMP',
      name: 'Computer Science'
    },
    {
      id: 'd2',
      code: 'MCB',
      name: 'Microbiology'
    },
    {
      id: 'd3',
      code: 'ECE',
      name: 'Civil Engineering'
    },
    {
      id: 'd4',
      code: 'EEE',
      name: 'Electrical & Electronics Engineering'
    },
    {
      id: 'd5',
      code: 'EME',
      name: 'Mechanical Engineering'
    },
    {
      id: 'd6',
      code: 'FST',
      name: 'Food Science & Technology'
    },
    {
      id: 'd7',
      code: 'THA',
      name: 'Theatre Arts'
    },
    {
      id: 'd8',
      code: 'ACC',
      name: 'Accounting'
    }
  ];

  getDepartmentName($key) {
    const name = 'name';
    if ($key === '0') {
      return '';
    } else {
      return _.find(this.array, object => {
        return object.$key === $key;
      });
    }
  }
}
