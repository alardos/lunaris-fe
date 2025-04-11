import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import showdown from 'showdown';
import { CardService } from '../../service/card.service';
import { TextCardData } from '../../model/card.model';
import { ConfigService } from '../../service/config.service';
import { Member } from '../../model/workspace.model';

@Component({
    selector: 'app-text-card',
    imports: [CommonModule, FormsModule],
    templateUrl: './text-card.component.html',
    styleUrl: './text-card.component.scss',
})
export class TextCardComponent implements OnInit {
    @Input({ required: true }) data!: TextCardData;
    @Input({ required: true }) members!: Member[];
    @ViewChild('textarea') textareaRef!: ElementRef<HTMLElement>;
    @HostBinding("style.--owner-color") private ownerColor!: string;

    mode: 'view'|'edit' = 'view';
    viewValue = '';
    mdConverter: showdown.Converter;

    constructor(private cardService: CardService, config: ConfigService) {
        this.mdConverter = config.mdConverter;
    }

    ngOnInit(): void {
        this.viewValue = this.mdConverter.makeHtml(this.data.content)

        this.ownerColor = this.thisCardColor()
    }

    thisCardColor(): string {
        return this.members.find(m => m.id === this.data.owner)?.color ?? "#FFFFFF"
    }
    textareaKeydown() {
        this.textareaRef.nativeElement.style.height = 'auto';
        this.textareaRef.nativeElement.style.height = `${this.textareaRef.nativeElement.scrollHeight+20}px`
        this.data.content = (this.textareaRef.nativeElement as any).value;
    }

    stopPropagation(event: Event) { event.stopPropagation(); }

    focusText() { this.textareaRef.nativeElement.focus() }

    save() {
        this.data.content = (this.textareaRef.nativeElement as any).value
        this.viewValue = this.mdConverter.makeHtml(this.data.content);
        this.mode = 'view';
        this.cardService.update(this.data)
    }

    edit() { this.mode = 'edit'; }

    bold() {
        this.replaceSelection(selected => {
            if (selected.startsWith("**") && selected.endsWith("**"))
                return selected.substring(2).substring(0,selected.length-4)
            else
                return `**${selected}**`
        })
    }

    italic() {
        this.replaceSelection(selected => {
            if (selected.startsWith("*") && selected.endsWith("*"))
                return selected.substring(1).substring(0,selected.length-2)
            else
                return `*${selected}*`
        })
    }
    header() {
        this.togglePrefix("# ")
    }
    bullet() {
        this.togglePrefix("- ")
    }
    numbered() {
        this.togglePrefix("1. ")
    }

    togglePrefix(prefix: string) {
        const textarea: any = this.textareaRef.nativeElement;
        let start = textarea.selectionStart;
        let value = textarea.value as string;
        const beforeCursor = value.substring(0, start);
        const lineStart = beforeCursor.lastIndexOf('\n') + 1;

        if (value.substring(lineStart).startsWith(prefix)) {
            value = value.substring(0, lineStart) + value.substring(lineStart+prefix.length)
            start = start-prefix.length;
        } else {
            value = value.substring(0, lineStart) + prefix + value.substring(lineStart)
            start = start+prefix.length;
        }

        textarea.value = value;
        textarea.selectionStart = start;
    }

    replaceSelection(change: (og: string) => string) {
        const textarea: any = this.textareaRef.nativeElement;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);

        if (selectedText) {
            const newText = textarea.value.substring(0, start) + change(selectedText) + textarea.value.substring(end);
            textarea.value = newText;
        }
    }

}
