import { Injectable } from '@angular/core';
import { env } from '../../../environment';
import { Workspace } from '../model/workspace.model';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class WorkspaceService {

    constructor(private http: HttpClient) { }

    async details(workspace: string): Promise<Workspace> {
        return firstValueFrom(this.http.get(`${env.api}w/${workspace}`))
            .then((data:any) => Workspace.from(data))
    }

    async mine(): Promise<Workspace[]> {
        return firstValueFrom(this.http.get(`${env.api}mine`))
            .then((data) => (data as any).map(Workspace.from))
    }
}
