import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Position } from '../interfaces/position';

@Service()
export class PositionService {
    http = inject(HttpClient)
    host = 'http://localhost:8000/api/positions'

    private get headers() {
        const token = localStorage.getItem('token');
        return { Authorization: `Bearer ${token}` };
    }

    getPositions() {
        return this.http.get(this.host, { headers : this.headers })
    }

    createPositions(position: Position){
        const url = `${this.host}`
        return this.http.post(url, position, {headers: this.headers})
    }

    updatePositions(position: any){
        const url = `${this.host}/${position.id}`
        return this.http.put(url,position,{headers : this.headers})
    }

    deletePositions(id: number){
        const url = `${this.host}/${id}`
        return this.http.delete(url,{headers : this.headers})
    }

}
