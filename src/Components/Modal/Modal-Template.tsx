import React from 'react';
import ReactDOM from 'react-dom';
interface PropsType {
    component: React.ReactElement,
    toggleBool: boolean
}

const rootOfModal: HTMLDivElement = document.getElementById('fixed-modal') as HTMLDivElement;

function ModalTemplate({
    component,
    toggleBool
}: PropsType) {

    return ReactDOM.createPortal(<div>
        <div className={ `modal-container ${toggleBool ? 'visible opacity-100' : 'invisible opacity-0'}` }>
            { component }
        </div>
        <div className={ `modal-bg ${toggleBool ? 'visible opacity-100' : 'invisible opacity-0'}` }>
        </div>
    </div>,
    rootOfModal)
};

export default ModalTemplate;