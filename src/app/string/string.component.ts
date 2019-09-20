import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material';
import { StringService } from '../string.service';
import { ModalComponent } from '../modal/modal.component';
import { ConfirmationDialogComponent } from '../shared/dialog/confirmation-dialog/confirmation-dialog.component';
import { StringMP } from '../models/string';


@Component({
  selector: 'app-string',
  templateUrl: './string.component.html',
  styleUrls: ['./string.component.scss']
})
export class StringComponent implements OnInit {

  constructor(
    private service: StringService,     
    private fb: FormBuilder,  
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }
  
  displayedColumns = ['id', 'valor','customColumn']; 
  strings = new MatTableDataSource<String>();

  ngOnInit() {   
    this.service.getAll()
      .subscribe(data => {  
        this.strings.data = data as unknown as String[];     
      }
    );     
  } 

  openDialogNovo(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '350px',
      data: ""
    });
    dialogRef.afterClosed().subscribe(result => {     
    });
  }

  openDialogEditar(string: StringMP): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '350px',
      data: { id : string.id, valor: string.valor}
    });
    dialogRef.afterClosed().subscribe(result => {     
      this.ngOnInit();
    });
  }

  openDialogDelete(string: StringMP): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Deseja excluir o registro?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.service.delete(string.id).subscribe((data) => { 
          console.log("deletado");          
          this.openSnackBar("Registro deletado com sucesso","success",);
        },error  => {this.openSnackBar("Ocorreu um erro.","danger");});        
      }
      this.ngOnInit();
    });
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, null, {
      duration: 2000,
      panelClass: [action]
    });
    this.ngOnInit();
  }
}
