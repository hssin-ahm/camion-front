import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
} from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { CropperComponent } from 'angular-cropperjs';
import { Observable } from 'rxjs';
import { CurrentUser } from 'src/app/shared/modules/layouts/model/currentUser.interface';
import { getMeStart } from 'src/app/shared/modules/layouts/state/layout.actions';
import { curentUserSelector } from 'src/app/shared/modules/layouts/state/layout.selector';
import { AppState } from 'src/app/store/app.state';
import {
  changeaAtuelBreadcrumb,
  setLoadingSpinner,
} from 'src/app/store/shared/shared.action';
import { environment } from 'src/environments/environment';
import { FileService } from '../../services/file.service';
import { updateLoggedUser } from '../../state/user.actions';

@Component({
  selector: 'app-update-profil',
  templateUrl: './update-profil.component.html',
  styleUrls: ['./update-profil.component.scss'],
})
export class UpdateProfilComponent implements OnInit {
  @ViewChild('angularCropper') public angularCropper: CropperComponent;

  imgBaseUrl = environment.imgUrl;
  user;
  filename: any = this.imgBaseUrl + 'no-photo.png';
  constructor(
    private uploadService: FileService,
    private store: Store<AppState>
  ) {}
  curentUser$: Observable<CurrentUser | null>;
  currentUser: any;
  fileStatus = { status: '', requestType: '', percent: 0 };

  ngOnInit(): void {
    this.initializeValues();
    this.changeBreadcrumb();
  }

  changeBreadcrumb() {
    this.store.dispatch(
      changeaAtuelBreadcrumb({
        item: 'User',
        itemActive: 'Update profile',
      })
    );
  }
  initializeValues(): void {
    this.store.dispatch(getMeStart());
    this.curentUser$ = this.store.pipe(select(curentUserSelector));
    this.curentUser$.subscribe((data) => {
      this.currentUser = data?.user;
      this.filename = this.imgBaseUrl + this.currentUser?.photo;
    });
  }
  handleFileInput(event: any) {
    if (event.target.files.length) {
      var fileTypes = ['jpg', 'jpeg', 'png']; //acceptable file types
      var extension = event.target.files[0].name.split('.').pop().toLowerCase(), //file extension from input file
        isSuccess = fileTypes.indexOf(extension) > -1; //is extension in acceptable types
      if (isSuccess) {
        this.onUploadFiles(event);
      } else {
        alert('Selected file is not an image. Please select an image file.');
      }
    }
  }

  onUploadFiles(event): void {
    let file: File = null;
    let fd = new FormData();
    file = <File>event.target.files[0];
    fd.append('file', file, file.name);
    this.uploadService.upload(fd, this.currentUser._id).subscribe(
      (res: any) => {
        this.resportProgress(res);

        if (res.type == HttpEventType.Response) {
          this.initializeValues();
          let name: any = res.body;
          this.filename = this.imgBaseUrl + name?.data;
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.fileStatus.percent = 0;
      }
    );
  }

  private resportProgress(httpEvent: HttpEvent<string>): void {
    switch (httpEvent.type) {
      case HttpEventType.UploadProgress:
        this.uploadStatus(httpEvent.loaded, httpEvent.total!, 'Uploading... ');
        break;
      case HttpEventType.ResponseHeader:
        console.log('Header Return ', httpEvent);
        break;
      case HttpEventType.Response:
        this.fileStatus.status = 'done';
        this.filename = httpEvent.body;

        this.fileStatus.status = 'done';
        setTimeout(() => {
          this.fileStatus.percent = 0;
        }, 1000);
        break;
      default:
        console.log(httpEvent);
        break;
    }
  }
  private uploadStatus(loaded: number, total: number, requestType: string) {
    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round((100 * loaded) / total);
  }
  submit(form: NgForm) {
    const user = form.value;
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(updateLoggedUser({ user }));
  }
}
