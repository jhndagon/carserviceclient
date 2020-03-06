import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../shared/owner/owner.service';
import { Router } from '@angular/router';
import { CarService } from '../shared/car/car.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {

  owners: Array<any>;
  selectedOwners = [];

  constructor(
    private ownerService: OwnerService,
    private carService: CarService,
    private router: Router
  ) { }

  ngOnInit() {
    this.ownerService.getAll().subscribe( data => {
      this.owners = data._embedded.owners;

    });
  }

  async delete() {
    await this.carService.getAllEmbedded().subscribe( datos => {
      this.selectedOwners.forEach( dato => {
        const owner = this.owners.find(data => data.dni === dato);
        this.ownerService.remove(owner._links.self.href).subscribe(data => data);
        const car = datos._embedded.cars.filter( data => data.ownerDni === owner.dni);
        if (car) {
          car.forEach(dato => {
            dato.ownerDni = null;
            dato.href = dato._links.self.href;
            this.carService.save(dato).subscribe(data => data);
          });
        }
      });
    });

    this.router.navigate(['/car-list']);
  }

  listSelectedOwners(event) {
    if (event.checked) {
      this.selectedOwners.push(event.source.name);
    } else {
      this.selectedOwners = this.selectedOwners.filter(dato => dato !== event.source.name);
    }
  }

}
