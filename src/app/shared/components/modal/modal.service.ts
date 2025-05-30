import { Injectable, TemplateRef, inject } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfig } from '../../models/modal-config.model';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private modalService = inject(NgbModal);

  open(config: ModalConfig): NgbModalRef {
    const modalRef = this.modalService.open(config.template, {
      size: config.size || 'md',
      centered: config.centered ?? true,
      backdrop: config.backdrop || 'static'
    });

    if (config.data) {
      (modalRef.componentInstance as any).data = config.data;
    }

    return modalRef;
  }
}