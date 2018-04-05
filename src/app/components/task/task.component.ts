import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.services';
import { Task } from './../../models/task.models';
declare var $ :any;


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  tasks: Task[];
  editState = false;
  taskToEdit: Task;
  constructor( private TaskService: TaskService) { }

  ngOnInit() {
    this.TaskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  deleteTask(event, task) {
    const response = confirm('are you sure you want to delete?');
    if (response ) {
      this.TaskService.deleteTask(task);
    }
    return;
  }

  editTask(event, task) {
    this.editState = !this.editState;
    this.taskToEdit = task;
  }

  updateTask(task) {
    this.TaskService.updateTask(task);
    this.taskToEdit = null;
    this.editState = false;
    $('#myModal').modal('hide');
  }

}
