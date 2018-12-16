import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  navList: any = [
    {
      mainLabel: 'Main Title 1',
      subList: [{ label: 'Item 1' }, { label: 'Item 2' }, { label: 'Item 3' }],
      active: false
    },
    {
      mainLabel: 'Main Title 2',
      subList: [
        { label: 'Item 21', link: 'content1' },
        { label: 'Item 22' },
        { label: 'Item 23' }
      ],
      active: true
    }
  ];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {}

  toggleList(key) {
    this.navList = this.navList.map(item => this.setActive(item, key));
    console.log(this.navList);
  }

  onClickSubItem(key) {
    const subListArr = this.navList.reduce((acc, current) => {
      console.log(acc.concat(current.subList));
      return acc.concat(current.subList);
    }, []);

    const [selectedPath] = subListArr
      .filter(i => i.label === key)
      .map(j => j.link);

    this.navigateTo(selectedPath);
  }

  private navigateTo(path) {
    this.router.navigate([path], { relativeTo: this.activatedRoute });
  }

  private setActive(item, key) {
    item.active = item.mainLabel === key ? !item.active : false;
    return item;
  }
}
