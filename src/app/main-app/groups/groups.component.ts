import {Component, OnInit} from '@angular/core';

interface DummyType {
  name: string;
  description: string;
  location: string;
  date: Date;
  interests?: string[];
}

const DummyData: DummyType[] = [
  {
    name: 'Chemistry Group',
    description:'Lorem ipsum dolor sit amet, consectetur ' +
      'adipiscing elit. Aenean posuere suscipit massa, eu aliquam nisl aliquet eget. ' +
      'Sed at facilisis dui, a luctus mauris. Nunc sit amet nibh dui.',
    location: 'Str. Avram Iancu 42, Cluj-Napoca, Romania',
    date: new Date(2023, 0O5, 0O5, 17, 0, 0, 0),
    interests: ['Chemistry', 'Biology', 'Physics']
  },
  {
    name: 'Math Group :)',
    description:'Lorem ipsum dolor sit amet, consectetur ' +
      'adipiscing elit. Aenean posuere suscipit massa, eu aliquam nisl aliquet eget',
    location: 'Str. Avram Iancu 42, Cluj-Napoca, Romania',
    date: new Date(2023, 0O5, 0O5, 17, 0, 0, 0),
    interests: ['Math', 'Physics', 'Computer Science']
  },
  {
    name: 'SCS is Fun!',
    description:'Lorem ipsum dolor sit amet, consectetur ' +
      'adipiscing elit. Aenean posuere suscipit massa, eu aliquam nisl aliquet eget. ' +
      'Sed at facilisis dui, a luctus mauris. Nunc sit amet nibh dui.',
    location: 'Str. Avram Iancu 42, Cluj-Napoca, Romania',
    date: new Date(2023, 0O5, 0O5, 17, 0, 0, 0),
    interests: ['Computer Science', 'Math', 'Systems Engineering']
  },
  {
    name: 'Marcus\' group',
    description:'Lorem ipsum dolor sit amet, consectetur ' +
      'adipiscing elit. Aenean posuere suscipit massa, eu aliquam nisl aliquet eget. ' +
      'Sed at facilisis dui, a luctus mauris. Nunc sit amet nibh dui.',
    location: 'Str. Avram Iancu 42, Cluj-Napoca, Romania',
    date: new Date(2023, 0O5, 0O5, 17, 0, 0, 0),
    interests: ['Computer Science', 'Math', 'Linear Algebra']
  },
  {
    name: 'Martin\'s group',
    description:'Lorem ipsum dolor sit amet, consectetur ' +
      'adipiscing elit. Aenean posuere suscipit massa, eu aliquam nisl aliquet eget. ' +
      'Sed at facilisis dui, a luctus mauris. Nunc sit amet nibh dui.',
    location: 'Str. Avram Iancu 42, Cluj-Napoca, Romania',
    date: new Date(2023, 0O5, 0O5, 17, 0, 0, 0),
    interests: ['Computer Science', 'Linear Algebra', 'Mathematical Analysis']
  },
  {
    name: 'Maria\'s group',
    description:'Lorem ipsum dolor sit amet, consectetur ' +
      'adipiscing elit. Aenean posuere suscipit massa, eu aliquam nisl aliquet eget. ' +
      'Sed at facilisis dui, a luctus mauris. Nunc sit amet nibh dui.',
    location: 'Str. Avram Iancu 42, Cluj-Napoca, Romania',
    date: new Date(2023, 0O5, 0O5, 17),
    interests: ['Computer Science', 'Linear Algebra', 'Mathematical Analysis']
  }
];

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})

export class GroupsComponent implements OnInit{
  public dummyData = DummyData;
  ngOnInit(): void {
    this.loadGroups();
  }

  loadGroups(): void {
    console.log('loading group cards')
    // this.recruitingToolService.getAllTools().subscribe((results) => {
    //   this.recruitingTools = results;
    // });
  }

}
