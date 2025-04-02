import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

interface LessonType {
  icon: string;
  label: string;
  type: string;
}

@Component({
  selector: 'app-add-lesson-popup',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './add-lesson-popup.component.html',
  styleUrls: ['./add-lesson-popup.component.scss'],
})
export class AddLessonPopupComponent {
  learningContent: LessonType[] = [
    { icon: 'article', label: 'Article', type: 'article' },
    { icon: 'play_circle', label: 'Video', type: 'video' },
    { icon: 'assignment', label: 'Assignment', type: 'assignment' },
    { icon: 'link', label: 'Link', type: 'link' },
  ];

  examContent: LessonType[] = [
    { icon: 'quiz', label: 'Quiz', type: 'quiz' },
    { icon: 'assessment', label: 'Test', type: 'test' },
  ];

  constructor(private dialogRef: MatDialogRef<AddLessonPopupComponent>) {}

  selectLessonType(type: LessonType): void {
    this.dialogRef.close(type);
  }

  close(): void {
    this.dialogRef.close();
  }
}
