import { Component, Input, OnInit } from '@angular/core';
import { CardData, TextCardData } from '../../model/card.model';
import { CommonModule } from '@angular/common';
import { TextCardComponent } from "../text-card/text-card.component";
import { Member } from '../../model/workspace.model';

@Component({
    selector: 'app-card-wrapper',
    imports: [CommonModule, TextCardComponent],
    templateUrl: './card-wrapper.component.html',
    styleUrl: './card-wrapper.component.scss'
})
export class CardWrapperComponent implements OnInit {
    @Input({required:true}) data!: CardData;
    @Input({required:true}) members!: Member[];

    textCardData?: TextCardData;

    ngOnInit(): void {
        if (this.data instanceof TextCardData) {
            this.textCardData = this.data
        }
    }


}
