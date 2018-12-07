import { Pipe, PipeTransform } from '@angular/core';
import { ClientService } from 'src/app/core/services/client.service';

@Pipe({
    name: 'filterByName'
})
export class ClientFilterByName implements PipeTransform {
    constructor(private clientService: ClientService) { }
    transform(clients, digited: string) {
        this.clientService.getAll(digited).subscribe(res => clients = res);
        return clients.filter(client => {
            const fullName = `${client.firstName} ${client.lastName}`;
            return fullName.toLowerCase().includes(digited.toLowerCase());
        });
    }
}
