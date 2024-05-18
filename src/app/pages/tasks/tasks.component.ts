import { Component, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

interface Task {
  name: string,
  isCompleted: boolean
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {
  task = new FormControl<string>('', { nonNullable: true, });

  tasks = signal<Task[]>([])

  completedTasks = computed(()=>{
    return this.tasks().filter((task) => task.isCompleted);
  })

  uncompletedTasks = computed(()=>{
    return this.tasks().filter((task) => !task.isCompleted);
  })

  constructor() {
    effect(()=>{
      if(this.uncompletedTasks().length>3)
        alert(`Tienes ${this.uncompletedTasks().length} por completar`)
    })
  }

  addTask() {
    if(this.task.value === ''){
      alert('El input esta vacio');
      return
    }

    if(this.findTask(this.task.value)) {
      alert('La tarea ya existe en la lista');
      return;
    }

    this.tasks.update((tasks) => [
      ...tasks,
      { name: this.task.value, isCompleted: false }
    ]);
    this.task.reset();
  }

  toggleCompletedTask(task: Task){
    this.tasks.mutate(tasks => {
      const taskToUpdate = this.tasks().find(t => t.name === task.name);
      if(taskToUpdate) taskToUpdate.isCompleted = ! taskToUpdate.isCompleted;
      return tasks
    })
  }

  deleteTask(task: Task) {
    this.tasks.update((tasks) => tasks.filter(t=> t.name !== task.name))
  }

  resetTask() {
    this.tasks.set([]);
  }

  findTask(name:string){
    return this.tasks().find(
      task => task.name.toLowerCase() === name.toLowerCase()
    );
  }
}
