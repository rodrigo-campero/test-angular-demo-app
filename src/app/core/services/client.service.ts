import { Injectable } from '@angular/core';
import { Client } from 'src/app/shared/models/client.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getAll(search?: String) {
    if (search) {
      return this.http.get<Client[]>(`client?search=${search}`);
    }
    return this.http.get<Client[]>('client');
  }

  getById(id: String) {
    return this.http.get<Client>(`client/${id}`);
  }

  addOrUpdate(client: Client) {
    if (!client.clientId) {
      return this.http.post('client', JSON.stringify(client));
    }
    return this.http.put(`client/${client.clientId}`, JSON.stringify(client));
  }

  remove(id: String) {
    return this.http.delete(`client/${id}`);
  }
}
