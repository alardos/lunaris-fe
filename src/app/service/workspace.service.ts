import { Injectable } from '@angular/core';
import { env } from '../../../environment';
import { Distribution, Workspace } from '../model/workspace.model';
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

    async distribution(workspace: string): Promise<Distribution> {
        return firstValueFrom(this.http.get(`${env.api}w/${workspace}/distribution/3col`))
            .then((data:any) => Distribution.from(data))
    }

    async updateDistribution(workspace: string, distribution: Distribution): Promise<Distribution> {
        return firstValueFrom(this.http.put(`${env.api}w/${workspace}/distribution/update`, distribution))
            .then(data => data as Distribution)
    }

    async mine(): Promise<Workspace[]> {
        return firstValueFrom(this.http.get(`${env.api}mine`))
            .then((data) => (data as any).map(Workspace.from))
    }
}
