import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddJinetePage } from './add-jinete.page';

const routes: Routes = [
  {
    path: '',
    component: AddJinetePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddJinetePageRoutingModule {}
