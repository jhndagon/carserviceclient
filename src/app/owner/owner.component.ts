import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../shared/owner/owner.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {

  owners: Array<any>;

  constructor(
    private ownerService: OwnerService
  ) { }

  ngOnInit() {
    this.ownerService.getAll().subscribe( data => {
      this.owners = data._embedded.owners;
    });
  }

}
