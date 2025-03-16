import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { TextCardComponent } from '../../component/text-card/text-card.component';
import { CardService } from '../../service/card.service';
import { TextCardData } from '../../model/card.model';

@Component({
    selector: 'app-workspace-page',
    imports: [CommonModule, DragDropModule, TextCardComponent],
    templateUrl: './workspace-page.component.html',
    styleUrl: './workspace-page.component.scss',
})
export class WorkspacePageComponent implements OnInit {
    leftColumn: TextCardData[] = [
    ];
    centerColumn: TextCardData[] = [
    ];
    rightColumn: TextCardData[] = [
    ];

    constructor(private cardService: CardService) { }

    async ngOnInit() {
        this.centerColumn = (await this.cardService.allForWorkspace()).map(c => c as TextCardData)
    }

    async createTextCard() {
        this.centerColumn.push(
            await this.cardService.create(new TextCardData(''))
        )
    }

    drop(event: CdkDragDrop<TextCardData[]>) {
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
