import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StringService } from '../string.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StringMP } from '../models/string';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public strinMp: StringMP,
    private fb: FormBuilder,
    private service: StringService, 
    private _snackBar: MatSnackBar ) { }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  cadStringForm: FormGroup;  

  ngOnInit() {
    this.inicializarForm();
  }

  inicializarForm(){
    this.cadStringForm = this.fb.group({      
      valor: this.fb.control("", [Validators.required]),
      id:this.fb.control(null, []),
    });
    this.validarValor(this.strinMp);    
  }

  validarValor(strinMp: StringMP){
    if(strinMp){
      this.cadStringForm.patchValue ({
        "valor": strinMp.valor,
        "id" : strinMp.id,
      });
     
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, null, {
      duration: 2000,
      panelClass: [action]
    }); 
  }

  save(){   
    if( this.cadStringForm.valid){      
      this.service.save(this.cadStringForm.value).subscribe((data) => { 
        this.cadStringForm.reset();   
        this.openSnackBar("Registro salvo com sucesso.","success");
        this.dialogRef.close();        
      },error  => {
        console.log(error.error.message);
        this.openSnackBar(error.error.message,"danger");});  
    } else {
      this.openSnackBar("Dados não preenchidos","danger")
    }      
  }
}
