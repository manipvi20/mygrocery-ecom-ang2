import { Component, ViewChild } from '@angular/core';
import { Modal } from 'ng2-modal';
@Component({
    selector: 'modal-wrapper',
    templateUrl: './modal.component.html'
})
export class ModalComponent {

    @ViewChild(Modal) mymodel : Modal;

    constructor(){}

    open() {
        this.mymodel.open();
    }
}