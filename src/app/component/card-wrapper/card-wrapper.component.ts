import { Component, Input, OnInit } from '@angular/core';
import { CardData, TextCardData } from '../../model/card.model';
import { CommonModule } from '@angular/common';
import { TextCardComponent } from "../text-card/text-card.component";

@Component({
    selector: 'app-card-wrapper',
    imports: [CommonModule, TextCardComponent],
    templateUrl: './card-wrapper.component.html',
    styleUrl: './card-wrapper.component.scss'
})
export class CardWrapperComponent implements OnInit {
    @Input({required:true}) data!: CardData;

    textCardData?: TextCardData;

    ngOnInit(): void {
        if (this.data instanceof TextCardData) {
            this.textCardData = this.data
        }
    }


}
