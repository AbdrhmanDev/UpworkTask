import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogContainer, MatDialogContent } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

interface Section {
  name: string;
  lessons: any[];
}

@Component({
  selector: 'app-move-to-section',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    MatDialogActions,
    MatDialogContent
  ],
  template: `
    <h2 mat-dialog-title>Move to section</h2>
    <mat-dialog-content>
      <mat-form-field appearance="fill" style="width: 100%;">
        <mat-label>Select section</mat-label>
        <mat-select [(ngModel)]="selectedSection">
          <mat-option *ngFor="let section of sections" [value]="section">
            {{ section.name }}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="close()">Cancel</button>
      <button
        mat-button
        color="primary"
        (click)="move()"
        [disabled]="!selectedSection"
      >
        Move
      </button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      :host {
        display: block;
        padding: 20px;
      }
    `,
  ],
})
export class MoveToSectionComponent {
  sections: Section[] = [];
  selectedSection: Section | null = null;

  constructor(
    private dialogRef: MatDialogRef<MoveToSectionComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { sections: Section[]; currentSectionIndex: number }
  ) {
    this.sections = data.sections.filter(
      (_, index) => index !== data.currentSectionIndex
    );
  }

  move(): void {
    this.dialogRef.close(this.selectedSection);
  }

  close(): void {
    this.dialogRef.close();
  }
}
