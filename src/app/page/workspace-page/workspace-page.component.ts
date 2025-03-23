import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { TextCardComponent } from '../../component/text-card/text-card.component';
import { CardService } from '../../service/card.service';
import { CardData, TextCardData } from '../../model/card.model';
import { env } from '../../../../environment';
import { CardWrapperComponent } from '../../component/card-wrapper/card-wrapper.component';

@Component({
    selector: 'app-workspace-page',
    imports: [CommonModule, DragDropModule, TextCardComponent, CardWrapperComponent],
    templateUrl: './workspace-page.component.html',
    styleUrl: './workspace-page.component.scss',
})
export class WorkspacePageComponent implements OnInit {
    leftColumn: CardData[] = [ ];
    centerColumn: CardData[] = [ ];
    rightColumn: CardData[] = [ ];

    constructor(private cardService: CardService) { }

    async ngOnInit() {
        this.centerColumn = (await this.cardService.allForWorkspace()).map(c => c as TextCardData)
    }

    async createTextCard() {
        this.centerColumn.push(
            await this.cardService.create(
                new TextCardData('', env.testWorkspaceId, '', '')
            )
        )
    }

    drop(event: CdkDragDrop<CardData[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        }
    }
}
