import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Position } from '../interfaces/position';

@Service()
export class PositionService {
    http = inject(HttpClient)
    host = 'http://localhost:8000/api'

    getPositions() {
        const url = `${this.host}/positions`
        return this.http.get<Position[]>(url)
    }

    createPositions(position: any){
        const url = `${this.host}/positions`
        const token = localStorage.getItem('token')
        const headers = { Authorization :`Bearer${token}`}
        return this.http.post(url, position, {headers})
    }

    updatePositions(position: any){
        const url = `${this.host}/positions/${position.id}`
        const token = localStorage.getItem('token')
        const headers = {Authorization : `Bearer${token}`}
        return this.http.put(url,position,{headers})
    }

    deletePositions(id: number){
        const url = `${this.host}/positions/${id}`
        const token = localStorage.getItem('token')
        const headers = { Authorization : `Bearer${token}`}
        return this.http.delete(url,{headers})
    }

}
