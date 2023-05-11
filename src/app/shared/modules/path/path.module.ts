import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PathComponent } from './path/path.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PathComponent],
  imports: [CommonModule, RouterModule],
  exports: [PathComponent],
})
export class PathModule {}
