import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Project } from '../interfaces/project';

@Service()
export class ProjectService {

    http = inject(HttpClient)
    host = 'http://localhost:8000/api/projects'

    private get headers() {
        const token = localStorage.getItem('token');
        return { Authorization: `Bearer ${token}` };
    }

    getProjects() {
        return this.http.get(this.host, { headers : this.headers })
    }

    createProjects(project: Project){
        const url = `${this.host}`
        return this.http.post(url, project, {headers: this.headers})
    }

    updateProjects(project: Project){
        const url = `${this.host}/${project.id}`
        return this.http.put(url,project,{headers : this.headers})
    }

    deleteProjects(id: number){
        const url = `${this.host}/${id}`
        return this.http.delete(url,{headers : this.headers})
    }

}
