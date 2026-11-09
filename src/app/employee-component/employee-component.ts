import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../shared/employee-service';
import { Position } from '../interfaces/position';
import { PositionService } from '../shared/position-service';
import { PositionNamePipe } from '../shared/pipe/position-name-pipe';
import { Employee } from '../interfaces/employee';

@Component({
  imports: [ReactiveFormsModule, PositionNamePipe],
  selector: 'app-employee-component',
  styleUrl: './employee-component.css',
  templateUrl: './employee-component.html',
})
export class EmployeeComponent {

  builder = inject(FormBuilder)
  employeeApi = inject(EmployeeService)
  positionsApi = inject(PositionService)

  //employees!: any[]
  employees = signal<any[]>([])
  positions = signal<Position[]>([])

  employeeForm = this.builder.group({
    id: [''],
    name: [''],
    city: [''],
    salary: [''],
    positionId: ['']
  })

  visibleModal = false
  addMode = true

  ngOnInit() {
    console.log('kezdődik...')
    this.getEmployees()
    this.getPositions()
  }

  
  getEmployees() {
    this.employeeApi.getEmployees().subscribe({
      next: (res: any) => {
        console.log(res)

        this.employees.set(res.data)
      },
      error: () => {}
    })
  }

  getPositions() {
    this.positionsApi.getPositions().subscribe({
      next: (res: any) => {
        console.log(res.data)
        this.positions.set(res.data)
      },
      error: () => {}
    })
  }


  
  saveEmployee() {          
    if (this.addMode) {
      this.createEmployee();
    } else {
      this.updateEmployee();
    }
  }

  createEmployee() {
    const v = this.employeeForm.value;
    const payload = {
      name: v.name,
      city: v.city,
      salary: Number(v.salary),
      positionId: Number(v.positionId)
    };

    this.employeeApi.createEmployee(payload).subscribe({
      next: () => {
        this.getEmployees();   // the new row appears with its real id
        this.hideModal();
      },
      error: (err) => console.error('Hiba létrehozáskor:', err)
    });
  }

  updateEmployee() {
    const v = this.employeeForm.value;
    const payload = {
      id: Number(v.id),
      name: v.name,
      city: v.city,
      salary: Number(v.salary),
      positionId: Number(v.positionId)
    };

    this.employeeApi.updateEmployee(payload).subscribe({
      next: () => {
        this.getEmployees();
        this.hideModal();
      },
      error: (err) => console.error('Hiba módosításkor:', err)
    });
  }


  deleteEmployee(id: number) {
    this.employeeApi.deleteEmployee(id).subscribe({
      next: () => this.getEmployees(),
      error: (err) => console.error('Hiba a törlés során:', err)
    });
  }




  onclickEdit(emp: Employee){
    console.log('editing: ' + emp.name);
    this.addMode = false;

    this.employeeForm.patchValue({
      id: String(emp.id),
      name: emp.name,
      city: emp.city,
      salary: String(emp.salary),
      positionId: String(emp.positionId)
    });

    this.visibleModal = true;

  }

  onClickAdd() {
    this.addMode = true;
    this.employeeForm.reset();
    this.visibleModal = true;
  }



  hideModal(){
    this.visibleModal= false;
    this.addMode = true;
    this.employeeForm.reset();
  }

  toggleModal() {
    this.visibleModal = ! this.visibleModal
  }
  


}
