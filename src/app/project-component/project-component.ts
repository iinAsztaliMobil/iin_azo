import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Project } from '../interfaces/project';
import { ProjectService } from '../shared/project-service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-project-component',
  styleUrl: './project-component.css',
  templateUrl: './project-component.html',
})
export class ProjectComponent {
  builder = inject(FormBuilder)
  ProjectApi = inject(ProjectService)

  //Projects!: any[]
  projects = signal<Project[]>([])

  projectForm = this.builder.group({
    id: [null as number | null],
    name: [''],
    describe: [''],
    startDate: [''],
    createdAt: [''], 
    updatedAt: ['']
  })

  visibleModal = false
  addMode = true

  ngOnInit() {
    console.log('kezdődik...')
    this.getProjects()
  }

  
  getProjects() {
    this.ProjectApi.getProjects().subscribe({
      next: (res: any) => {
        console.log(res)

        this.projects.set(res.data)
      },
      error: () => {}
    })
  }
  
  saveProject() {          
    if (this.addMode) {
      this.createProject();
    } else {
      this.updateProject();
    }
  }

  createProject() {

    const proj = this.projectForm.getRawValue() as unknown as Project;


    this.ProjectApi.createProjects(proj).subscribe({
      next: () => {
        this.getProjects();   // the new row appears with its real id
        this.hideModal();
      },
      error: (err: any) => console.error('Hiba létrehozáskor:', err)
    });
  }

  updateProject() {
    const proj = this.projectForm.getRawValue() as unknown as Project;

    this.ProjectApi.updateProjects(proj).subscribe({
      next: () => {
        this.getProjects();
        this.hideModal();
      },
      error: (err) => console.error('Hiba módosításkor:', err)
    });
  }


  deleteProject(id: number) {
    this.ProjectApi.deleteProjects(id).subscribe({
      next: () => this.getProjects(),
      error: (err) => console.error('Hiba a törlés során:', err)
    });
  }




  onclickEdit(proj: Project){
    console.log('editing: ' + proj.name);
    this.addMode = false;

    this.projectForm.patchValue({
      id: proj.id,
      name: proj.name,
      describe : proj.describe,
      createdAt: String(proj.createdAt)
    });

    this.visibleModal = true;

  }

  onClickAdd() {
    this.addMode = true;
    this.projectForm.reset();
    this.visibleModal = true;
  }



  hideModal(){
    this.visibleModal= false;
    this.addMode = true;
    this.projectForm.reset();
  }


}
