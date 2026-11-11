import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PositionService } from '../shared/position-service';
import { Position } from '../interfaces/position';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-position-component',
  styleUrl: './position-component.css',
  templateUrl: './position-component.html',
})
export class PositionComponent {
  builder = inject(FormBuilder)
  positionApi = inject(PositionService)

  positions = signal<Position[]>([])

  positionForm = this.builder.group({
    id: [null as number | null],
    name: [''],
    description: ['']
  })

  visibleModal = false
  addMode = true

  hideModal(){
    this.visibleModal = false
  }

  ngOnInit(){
    console.log('kezdes')
    this.getPositions()
  }

  getPositions(){
    this.positionApi.getPositions().subscribe({
      next: (res:any) => {
        console.log(res)
        this.positions.set(res.data)
      },
      error:(err)=> {console.log(err)}
    })
  }

  savePosition(){
    if(this.addMode){
      this.createPosition()
    }else{
      this.updatePosition()
    }
  }

  createPosition(){
    const pos = this.positionForm.getRawValue() as Position

    this.positionApi.createPositions(pos).subscribe({
      next: () => {
        this.getPositions()
        this.hideModal()
      },
      error: (err) => console.log('Hiba a létrehozáskor', err)
    })
  }

  updatePosition(){
    const pos = this.positionForm.getRawValue() as Position

    this.positionApi.updatePositions(pos).subscribe({
      next: () => {
        this.getPositions()
        this.hideModal()
      },
      error: (err) => console.log('Hiba a módosításkor', err)
    })
  }



  deletePos(id: number){
    this.positionApi.deletePositions(id).subscribe({
      next: () => this.getPositions(),
      error: (err) => console.log('Hiba a törlés során', err)
    })
  }

  onClickEdit(pos: Position){
    this.positionForm.patchValue({
      id: pos.id,
      name: pos.name,
      description: pos.description
    })

    this.visibleModal = true
  }

  onClickAdd(){
    this.addMode = true;
    this.positionForm.reset()
    this.visibleModal = true
  }

}
