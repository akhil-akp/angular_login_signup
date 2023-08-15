import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StartupService } from './startup.service';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.scss'],
})
export class StartupComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'name',
    'founder',
    'city',
    'sector',
    'revenue',
    'fundRequired',
    'fundRaised',
    'closingDate',
  ];
  dataSource: MatTableDataSource<any>;
  startups: any;
  isOpen = true;
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  // @ViewChild(MatSort) sort = new MatSort();
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(private startupService: StartupService) {
    // Create 100 users
    // const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.startups);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    // console.log('const init', this.dataSource.paginator);
  }

  ngOnInit() {
    this.fetchStartups();
  }

  getToggleRes() {
    this.isOpen = !this.isOpen;
  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fetchStartups() {
    this.startupService.getStartups().subscribe(
      (result: any) => {
        console.log('result from startup init:', result);
        this.startups = result.data;
        this.dataSource = result.data;
        console.log('data', this.startups);
        this.dataSource = new MatTableDataSource(this.startups);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.log('error from startup :', error);
      }
    );
  }
}
