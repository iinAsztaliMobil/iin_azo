import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

@Service()
export class ProjectService {

    http = inject(HttpClient)
    host = 'http://localhost:8000/api/projects'

    getProjects() {
        const token = localStorage.getItem('token')
        const headers = { Authorization: `Bearer ${token}`}
        return this.http.get(this.host, { headers })
    }

    createProjects(project: any){
        const url = `${this.host}`
        const token = localStorage.getItem('token')
        const headers = { Authorization :`Bearer${token}`}
        return this.http.post(url, project, {headers})
    }

    updateProjects(project: any){
        const url = `${this.host}/${project.id}`
        const token = localStorage.getItem('token')
        const headers = {Authorization : `Bearer${token}`}
        return this.http.put(url,project,{headers})
    }

    deleteProjects(id: number){
        const url = `${this.host}/${id}`
        const token = localStorage.getItem('token')
        const headers = { Authorization : `Bearer${token}`}
        return this.http.delete(url,{headers})
    }
}
