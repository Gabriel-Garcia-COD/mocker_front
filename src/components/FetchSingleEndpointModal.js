import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactModal from 'react-modal';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/esm/styles/prism';
import '../styles/FetchSingleEndpointModal.css'

export default function FetchSingleEndpointModal({ isOpen, onRequestClose, urlEndpoint, singleEndpoint }) {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Edit Endpoint Modal"
            appElement={document.getElementById('root')}
        >

            <button className="btn-single-endpoint close" onClick={onRequestClose}>
                <FontAwesomeIcon icon={faClose} className="icon" />
                Close
            </button>
            <div className='box-fetch-singlle'>
                <h2>Fetch Single Endpoint</h2>
                {urlEndpoint && (
                    <div>
                        <h3>Endpoint</h3>

                        <SyntaxHighlighter language="url" style={nord} wrapLongLines>
                            {urlEndpoint}
                        </SyntaxHighlighter>
                    </div>
                )}

                {singleEndpoint && (
                    <div>
                        <h3>Single Endpoint</h3>
                        <SyntaxHighlighter language="json" style={nord} showLineNumbers wrapLongLines>
                            {JSON.stringify(singleEndpoint, null, 2)}
                        </SyntaxHighlighter>
                    </div>
                )}
            </div>
        </ReactModal>
    )
}
