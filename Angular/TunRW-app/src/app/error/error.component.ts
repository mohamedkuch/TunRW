import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Router } from '@angular/router';

@Component({
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
    message = "An unknown Error has occured !";


    constructor(private router: Router,
        public dialogRef: MatDialogRef<ErrorComponent>,
        @Inject(MAT_DIALOG_DATA) public data: {message: string}) {
            console.log(data.message);
        }

    onClose(): void {
        this.dialogRef.close();
        this.router.navigate(['/admin']);
    }
}
