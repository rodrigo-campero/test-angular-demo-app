import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/core/services/client.service';
import { Client } from 'src/app/shared/models/client.model';
import { Gender, genderOptions } from 'src/app/shared/models/gender.enum';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  clients: Client[] = [];
  options = genderOptions;

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.getClients();
  }

  getClients() {
    return this.clientService.getAll().subscribe(data => {
      this.clients = data;
    });
  }

  remove(client: Client) {
    this.clientService.remove(client.clientId)
      .subscribe(res => {
        const newClients = this.clients.splice(0);
        const index = newClients.indexOf(client);
        newClients.splice(index, 1);
        this.clients = newClients;
      }, erro => console.log(erro));
  }
}
