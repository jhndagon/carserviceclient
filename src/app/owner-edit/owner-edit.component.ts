import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../shared/owner/owner.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-owner-edit',
  templateUrl: './owner-edit.component.html',
  styleUrls: ['./owner-edit.component.css']
})
export class OwnerEditComponent implements OnInit {
  owner: any = {};

  sub: Subscription;

  constructor(
    private ownerService: OwnerService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe( params => {
      const id = params['id'];
      if (id) {
        this.ownerService.getByDni(id).subscribe((owner: any) => {
          this.owner.dni = owner._embedded.owners[0].dni;
          this.owner.name = owner._embedded.owners[0].name;
          this.owner.profession = owner._embedded.owners[0].profession;
          this.owner.href = owner._embedded.owners[0]._links.self.href;
        });
      }
    });
  }

  gotoList() {
    this.router.navigate(['/owner']);
  }

  save(form: NgForm) {
    this.ownerService.save(form).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }


}
