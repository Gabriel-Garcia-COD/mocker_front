import { useState } from 'react';
import ReactModal from 'react-modal';
import InputField from './InputField';
import prettyJson from 'json-stringify-pretty-compact';
import '../styles/EditEndpointModal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCancel, faCheck, faClose, faPaperPlane, faWandSparkles } from '@fortawesome/free-solid-svg-icons';

const EditEndpointModal = ({ isOpen, onRequestClose, onSubmit, fields, onFieldChange }) => {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirm = () => {
    setIsConfirming(true);
  };

  const handleCancel = () => {
    setIsConfirming(false);
  };

  const handleSubmit = () => {
    setIsConfirming(false);
    onSubmit();
  };

  const beautifyJson = () => {
    onFieldChange('responseBody', prettyJson(JSON.parse(fields.responseBody)));
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


      <div className="UpdateEndpointForm">
        <h2>Update Endpoint</h2>
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
          type="textarea"
        />

        {isConfirming ? (
          <div className="confirmation-modal">
            <button className="btn-confirmation-modal yes" onClick={handleSubmit}><FontAwesomeIcon icon={faCheck} className="icon" />Yes</button>
            <button className="btn-confirmation-modal cancel" onClick={handleCancel}><FontAwesomeIcon icon={faCancel} className="icon" />Cancel</button>
          </div>
        ) : (
          <button className='btn-endpoint update' onClick={handleConfirm}> <FontAwesomeIcon icon={faPaperPlane} className="icon" />  Update Endpoint</button>
        )}
        <button className='btn-endpoint beautify' onClick={beautifyJson}> <FontAwesomeIcon icon={faWandSparkles} className="icon" /> Beautify JSON</button>
      </div>
    </ReactModal>
  );
};

export default EditEndpointModal;
