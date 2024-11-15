import { Component, Inject, Input } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-share-bottom-sheet',
  templateUrl: './share-bottom-sheet.component.html',
  styleUrls: ['./share-bottom-sheet.component.css']
})
export class ShareBottomSheetComponent {
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public postId: string,private bottomSheet: MatBottomSheet) {}

  getPostUrl(postId: string): string {
    return `https://example.com/post/${postId}`; // Replace with your actual URL

  }
  toggleShareMenu(postId: string): void {
    this.bottomSheet.open(ShareBottomSheetComponent, {
      data: { postId }
    });
  }
}
