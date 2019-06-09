import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
    message = "An unknown Error has occured !";


    constructor(
        public dialogRef: MatDialogRef<ErrorComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {message: string}) {
            console.log(data.message);
        }

    onClose(): void {
        this.dialogRef.close();
    }
}
