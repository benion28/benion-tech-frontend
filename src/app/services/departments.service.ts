import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {
  departmentList: AngularFireList<any>;
  array = [];
  nameValue = {
    name: null
  };

  constructor(private firebase: AngularFireDatabase) {
    this.getDepartments().subscribe(list => {
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
    if ($key === '0') {
      return '';
    } else {
      return this.returnDepartmentName($key);
    }
  }

  returnDepartmentName(key) {
    const name = 'name';
    return _.find(this.array, object => {
      return object.$key === key;
    });
  }

  getDepartments() {
    this.departmentList = this.firebase.list('departments');
    return this.departmentList.snapshotChanges();
  }
}

