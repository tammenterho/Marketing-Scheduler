import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-sure-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './sure-dialog.component.html',
  styleUrls: ['./sure-dialog.component.css'],
})
export class SureDialogComponent {}
