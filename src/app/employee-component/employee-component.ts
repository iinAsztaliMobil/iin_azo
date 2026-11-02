import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../shared/employee-service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-employee-component',
  styleUrl: './employee-component.css',
  templateUrl: './employee-component.html',
})
export class EmployeeComponent {

  builder = inject(FormBuilder)
  employeeApi = inject(EmployeeService)

  //employees!: any[]
  employees = signal<any[]>([])

  employeeForm = this.builder.group({
    name: [''],
    city: [''],
    salary: [''],
    positionId: ['']
  })

  visibleModal = false

  ngOnInit() {
    console.log('kezdődik...')
    this.getEmployees()
  }
  
  getEmployees() {
    this.employeeApi.getEmployees().subscribe({
      next: (res: any) => {
        console.log(res)
        // this.employees = res.data
        this.employees.set(res.data)
      },
      error: () => {}
    })
  }

  toggleModal() {
    this.visibleModal = ! this.visibleModal
  }

  saveEmployee() {
    console.log("Mentés...")
    this.createEmployee()
    this.toggleModal()
  }

  createEmployee() {
    // szogáltatás hívása
    this.employeeApi.createEmployee(this.employeeForm.value).subscribe({
      next: (data) => {
        console.log(data)
      },
      error: (err) => {
        console.error(err)
      }
    })
  }
}
