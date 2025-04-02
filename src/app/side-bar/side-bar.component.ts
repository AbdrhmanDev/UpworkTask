import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {
  DragDropModule,
  CdkDragDrop,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

interface Lesson {
  name: string;
  type: string;
}

interface Section {
  name: string;
  lessons: Lesson[];
  collapsed?: boolean;
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
  ],
})
export class SideBarComponent {
  items = [
    {
      name: 'Item 1',
      lessons: [
        { name: 'Lesson 1', type: 'text_snippet' },
        { name: 'Lesson 2', type: 'videocam' },
        { name: 'Lesson 3', type: 'help' },
      ],
      collapsed: false,
    }
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
          this.items.push({...currentSection, collapsed: false});
        } else {
          if (currentSection) {
            currentSection.lessons.push(item as Lesson);
          }
        }
      });
    }
  }

  openAddLessonPopup() {
    // Logic to open a popup for adding a lesson
    console.log('Add Lesson Popup Opened');
  }

  openSearch() {
    // Logic to open a search dialog or perform search
    console.log('Search Opened');
  }

  renameItem(index: number) {
    const newName = prompt('Enter new name:', this.items[index].name);
    if (newName) {
      this.items[index].name = newName;
    }
  }

  deleteItem(index: number) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.items.splice(index, 1);
    }
  }

  goToSection(lesson: any) {
    // Logic to navigate to the section of the lesson
    console.log('Navigating to section:', lesson.name);
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
}
