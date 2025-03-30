import { Injectable } from '@angular/core';
import { env } from '../../../environment';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { CardData, cardFactory } from '../model/card.model';

@Injectable({
    providedIn: 'root'
})
export class CardService {

    constructor(private http: HttpClient) { }

    async create(data: CardData): Promise<CardData> {
        return firstValueFrom(this.http.post(`${env.api}w/${data.workspace}/create-card`, data))
            .then((returned:any) => cardFactory(returned))
    }

    async allForWorkspace(workspace:string): Promise<CardData[]> {
        return firstValueFrom(this.http.get(`${env.api}w/${workspace}/card/all`))
            .then(data => (data as []).map(cardFactory))
    }

    async update(card: CardData) {
        return firstValueFrom(this.http.put(`${env.api}c/${card.id}`, card))
            .then(cardFactory)

    }
}
