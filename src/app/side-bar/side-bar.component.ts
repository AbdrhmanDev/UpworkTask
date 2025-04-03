import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import {
  DragDropModule,
  CdkDragDrop,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { AddLessonPopupComponent } from '../add-lesson-popup/add-lesson-popup.component';
import { MoveToSectionComponent } from '../move-to-section/move-to-section.component';

interface Lesson {
  name: string;
  type: string;
}

interface Section {
  name: string;
  lessons: Lesson[];
  collapsed?: boolean;
  isEditing?: boolean;
}

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    DragDropModule,
    FormsModule,
    MatDialogModule,
  ],
})
export class SideBarComponent {
  selectedIndex: number | null = null; // Track the selected item index
  editingIndex: number | null = null;
  items = [
    {
      name: 'Item 1',
      lessons: [
        { name: 'Lesson 1', type: 'text_snippet' },
        { name: 'Lesson 2', type: 'videocam' },
        { name: 'Lesson 3', type: 'help' },
      ],
      collapsed: false,
    },
  ];

  constructor(private dialog: MatDialog) {}

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      const allItems = this.items.reduce((acc: any[], item) => {
        acc.push(item);
        acc.push(...item.lessons);
        return acc;
      }, []);
      moveItemInArray(allItems, event.previousIndex, event.currentIndex);

      // Reconstruct items array
      this.items = [];
      let currentSection: Section | null = null;

      allItems.forEach((item) => {
        if ('lessons' in item) {
          currentSection = item as Section;
          currentSection.lessons = [];
          this.items.push({ ...currentSection, collapsed: false });
        } else {
          if (currentSection) {
            currentSection.lessons.push(item as Lesson);
          }
        }
      });
    }
  }

  openAddLessonPopup() {
    const dialogRef = this.dialog.open(AddLessonPopupComponent, {
      width: '800px',
      panelClass: 'lesson-type-dialog',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Add the new lesson to the first section (you might want to let user choose the section)
        if (this.items.length > 0) {
          this.items[0].lessons.push({
            name: `New ${result.label}`,
            type: result.icon,
          });
        }
      }
    });
  }

  openSearch() {
    const dialogRef = this.dialog.open(AddLessonPopupComponent, {
      width: '800px',
      panelClass: 'lesson-type-dialog',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Add the new lesson to the first section (you might want to let user choose the section)
        if (this.items.length > 0) {
          this.items[0].lessons.push({
            name: `New ${result.label}`,
            type: result.icon,
          });
        }
      }
    });
  }

  startEditing(index: number) {
    this.editingIndex = index;
  }

  finishEditing(index: number) {
    this.editingIndex = null;
  }

  deleteItem(index: number) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.items.splice(index, 1);
    }
  }

  goToSection(lesson: any, sectionIndex: number) {
    const dialogRef = this.dialog.open(MoveToSectionComponent, {
      width: '400px',
      data: {
        sections: this.items,
        currentSectionIndex: sectionIndex,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Remove the lesson from the current section
        const currentSection = this.items[sectionIndex];
        const lessonIndex = currentSection.lessons.indexOf(lesson);
        if (lessonIndex > -1) {
          currentSection.lessons.splice(lessonIndex, 1);
          // Add the lesson to the selected section
          const targetSection = this.items[this.items.indexOf(result)];
          targetSection.lessons.push(lesson);
        }
      }
    });
  }

  deleteLesson(itemIndex: number, lesson: any) {
    const item = this.items[itemIndex];
    const lessonIndex = item.lessons.indexOf(lesson);
    if (
      lessonIndex > -1 &&
      confirm('Are you sure you want to delete this lesson?')
    ) {
      item.lessons.splice(lessonIndex, 1);
    }
  }

  toggleCollapse(index: number) {
    this.items[index].collapsed = !this.items[index].collapsed;
  }

  selectItem(index: number): void {
    this.selectedIndex = index;
  }
}
