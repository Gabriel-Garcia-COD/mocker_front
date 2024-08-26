import ReactModal from 'react-modal';
import '../styles/AddEndpointForm.css'
import InputField from './InputField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBroom, faClose, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const AddEndpointForm = ({ isOpen, onRequestClose, fields, onFieldChange, onSubmit, clearInputsaddFields }) => {
    const handleTabInsert = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            const { selectionStart, selectionEnd } = event.target;
            const newValue =
                fields.responseBody.substring(0, selectionStart) +
                '\t' +
                fields.responseBody.substring(selectionEnd);

            onFieldChange('responseBody', newValue);
        }
    };

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Edit Endpoint Modal"
            appElement={document.getElementById('root')}
        >

            <button className="btn-endpoint close" onClick={onRequestClose}>
                <FontAwesomeIcon icon={faClose} className="icon" />
                Close
            </button>
            <div className="AddEndpointForm">
                <h2>Add Endpoint</h2>
                <InputField
                    label="Client ID"
                    value={fields.clientID}
                    onChange={(value) => onFieldChange('clientID', value)}
                />
                <InputField
                    label="Endpoint Path"
                    value={fields.endpointPath}
                    onChange={(value) => onFieldChange('endpointPath', value)}
                />
                <InputField
                    label="Method"
                    value={fields.method}
                    onChange={(value) => onFieldChange('method', value)}
                />
                <InputField
                    label="Response Body"
                    value={fields.responseBody}
                    onChange={(value) => onFieldChange('responseBody', value)}
                    onKeyDown={handleTabInsert}
                    type="textarea"
                />
                <button className='btn-endpoint add' onClick={onSubmit}> <FontAwesomeIcon icon={faPaperPlane} className="icon" />  Add Endpoint</button>
                <button className='btn-endpoint clear' onClick={clearInputsaddFields}> <FontAwesomeIcon icon={faBroom} className="icon" />  Clear Inputs</button>
            </div>
        </ReactModal>
    )
};

export default AddEndpointForm;
