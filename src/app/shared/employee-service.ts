import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

@Service()
export class EmployeeService {
    http = inject(HttpClient)
    host = 'http://localhost:8000/api/employees'

    getEmployees() {
        const token = localStorage.getItem('token')
        const headers = { Authorization: `Bearer ${token}`}
        return this.http.get(this.host, { headers })
    }

    createEmployee(employee: any) {
    const url = this.host
    const token = localStorage.getItem('token')
    const headers = { Authorization: `Bearer ${token}` }
    return this.http.post(url, employee, { headers })
    }

    updateEmployee(employee: any) {
        const url = `${this.host}/${employee.id}`;
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        
        return this.http.put(url, employee, { headers });
    }

    deleteEmployee(id: number) {
        const url = `${this.host}/${id}`;
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        
        return this.http.delete(url, { headers });
    }

}
