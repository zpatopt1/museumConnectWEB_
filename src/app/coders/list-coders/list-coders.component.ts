import { Component, OnDestroy, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CodersService } from '../coders.service';
import { Coder } from '../coder';
import { UpdateCoderComponent } from '../update-coder/update-coder.component';
import { CreateCoderComponent } from '../create-coder/create-coder.component';
import { DeleteCoderComponent } from '../delete-coder/delete-coder.component';

@Component({
  selector: 'app-list-coders',
  templateUrl: './list-coders.component.html',
  styleUrl: './list-coders.component.css'
})
export class ListCodersComponent implements OnInit {
  coder: Coder;
  coderList: Coder[] = [];
  displayTable: boolean = false;
  @ViewChild(UpdateCoderComponent) updateComponent!: UpdateCoderComponent;
  @ViewChild(CreateCoderComponent) createComponent!: CreateCoderComponent;
  @ViewChild(DeleteCoderComponent) deleteComponent!: DeleteCoderComponent;


  constructor(private service: CodersService) {
    this.coder = {
      id: '',
      code: '',
      firstName: '',
      lastName: '',
      email: '',
      picture: ''
    }
  }


  ngOnInit(): void {
    try {
      this.service.getAllCoders().subscribe((data) => {
        this.coderList = data;
        // Configuração do DataTable
        $('#myTable').DataTable();
        this.displayTable = true;
      });
    } catch (error) {
      console.log(error);
    }
  }

  setCoder(event: any, coder: Coder) {
    this.coder = coder;
    if (this.coder && this.coder.id !== undefined) {
      this.updateComponent.loadCoder(this.coder.id)
    } else {
      console.log("erro");
    }
  }

}
