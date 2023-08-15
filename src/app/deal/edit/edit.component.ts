import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  dealForm!: FormGroup;
  items: MenuItem[] = [];
  checked?: boolean;
  constructor() {
    // this.items = [];
  }

  ngOnInit() {
    this.menuPanel();
    this.dealFormFn();
  }

  menuPanel() {
    this.items = [
      {
        label: 'File',
        icon: 'pi pi-fw pi-file',
        command: (event) => this.selectedItem(event),
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
            // routerLink: ['/user/signup'],
            command: (event) => this.selectedItem(event),
            items: [
              {
                label: 'Bookmark',
                icon: 'pi pi-fw pi-bookmark',
                command: (event) => this.selectedItem(event),
              },
              {
                label: 'Video',
                icon: 'pi pi-fw pi-video',
                command: (event) => this.selectedItem(event),
              },
            ],
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-trash',
            command: (event) => this.selectedItem(event),
          },
          {
            label: 'Export',
            icon: 'pi pi-fw pi-external-link',
            command: (event) => this.selectedItem(event),
          },
        ],
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        command: (event) => this.selectedItem(event),
        items: [
          {
            label: 'Left',
            icon: 'pi pi-fw pi-align-left',
            command: (event) => this.selectedItem(event),
          },
          {
            label: 'Right',
            icon: 'pi pi-fw pi-align-right',
            command: (event) => this.selectedItem(event),
          },
          {
            label: 'Center',
            icon: 'pi pi-fw pi-align-center',
            command: (event) => this.selectedItem(event),
          },
          {
            label: 'Justify',
            icon: 'pi pi-fw pi-align-justify',
            command: (event) => this.selectedItem(event),
          },
        ],
      },
      {
        label: 'Users',
        icon: 'pi pi-fw pi-user',
        command: (event) => this.selectedItem(event),
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-user-plus',
            command: (event) => this.selectedItem(event),
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-user-minus',
            command: (event) => this.selectedItem(event),
          },
          {
            label: 'Search',
            icon: 'pi pi-fw pi-users',
            command: (event) => this.selectedItem(event),
            items: [
              {
                label: 'Filter',
                icon: 'pi pi-fw pi-filter',
                command: (event) => this.selectedItem(event),
                items: [
                  {
                    label: 'Print',
                    icon: 'pi pi-fw pi-print',
                    command: (event) => this.selectedItem(event),
                  },
                ],
              },
              {
                icon: 'pi pi-fw pi-bars',
                label: 'List',
                command: (event) => this.selectedItem(event),
              },
            ],
          },
        ],
      },
      {
        label: 'Events',
        icon: 'pi pi-fw pi-calendar',
        command: (event) => this.selectedItem(event),
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            command: (event) => this.selectedItem(event),
            items: [
              {
                label: 'Save',
                icon: 'pi pi-fw pi-calendar-plus',
                command: (event) => this.selectedItem(event),
              },
              {
                label: 'Delete',
                icon: 'pi pi-fw pi-calendar-minus',
                command: (event) => this.selectedItem(event),
              },
            ],
          },
          {
            label: 'Archieve',
            icon: 'pi pi-fw pi-calendar-times',
            command: (event) => this.selectedItem(event),
            items: [
              {
                label: 'Remove',
                icon: 'pi pi-fw pi-calendar-minus',
                command: (event) => this.selectedItem(event),
              },
            ],
          },
        ],
      },
    ];
  }
  selectedItem(event: any) {
    console.log(event);
  }

  dealFormFn() {
    this.dealForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required]),
      isConfirm: new FormControl(null, [Validators.required]),
      descriptions: new FormControl(null),
    });
  }

  onSubmit() {
    console.log(this.dealForm);
  }
}
