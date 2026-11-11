import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

@Service()
export class EmployeeService {
    http = inject(HttpClient)
    host = 'http://localhost:8000/api/employees'

    private get headers() {
        const token = localStorage.getItem('token');
        return { Authorization: `Bearer ${token}` };
    }

    getEmployees() {
        return this.http.get(this.host, { headers : this.headers })
    }

    createEmployee(employee: any) {
    const url = this.host
    return this.http.post(url, employee, { headers : this.headers })
    }

    updateEmployee(employee: any) {
        const url = `${this.host}/${employee.id}`;        
        return this.http.put(url, employee, { headers : this.headers });
    }

    deleteEmployee(id: number) {
        const url = `${this.host}/${id}`;        
        return this.http.delete(url, { headers : this.headers });
    }

}
