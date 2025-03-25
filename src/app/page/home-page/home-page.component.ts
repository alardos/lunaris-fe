import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from '../../service/workspace.service';
import { Workspace } from '../../model/workspace.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home-page',
    imports: [CommonModule],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {

    workspaces!: Workspace[]

    constructor(private workspaceService: WorkspaceService, private router: Router) {}

    async ngOnInit() {
        this.workspaces = await this.workspaceService.mine()
    }

    open(workspace: Workspace) {
        this.router.navigate([`w/${workspace.id}`])

    }


}
