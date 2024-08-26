import { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faAdd, faEye, faCheck, faCancel, faPaperPlane, faBroom } from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from 'react-paginate';
import '../styles/Home.css'
import api from '../services/api';
import InputField from '../components/InputField';
import AddEndpointForm from '../components/AddEndpointForm';
import EditEndpointModal from '../components/EditEndpointModal';
import FetchSingleEndpointModal from '../components/FetchSingleEndpointModal';

function Home() {
  const [addFields, setAddFields] = useState({
    clientID: '',
    endpointPath: '',
    method: 'GET',
    responseBody: '',
  });

  const [fetchClientEndpointsFields, setFetchClientEndpointsFields] = useState({
    clientID: '',
  });

  const [fetchSingleEndpointFields, setFetchSingleEndpointFields] = useState({
    clientID: '',
    endpointPath: '',
  });

  const [editModalResponseBody, setEditModalResponseBody] = useState({
    clientID: '',
    endpointPath: '',
    method: 'GET',
    responseBody: '',
  });

  const [allData, setAllData] = useState([]);
  const [clientEndpoints, setClientEndpoints] = useState([]);
  const [singleEndpoint, setSingleEndpoint] = useState(null);
  const [urlEndpoint, setUrlEndpoint] = useState("")
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [fechSingletModalIsOpen, setFechSingleModalIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    fetchAllData();
  }, [currentPage]);

  const clearInputsFetchSingle = () => {
    setFetchSingleEndpointFields({
      clientID: '',
      endpointPath: '',
    })
    setSingleEndpoint(null)
    setUrlEndpoint("")
  }

  const clearInputsFetchClient = () => {
    setFetchClientEndpointsFields({
      clientID: '',
    })
    setClientEndpoints([])
  }

  const clearInputsaddFields = () => {
    setAddFields({
      clientID: '',
      endpointPath: '',
      method: 'GET',
      responseBody: '',
    })
  }

  const onAddFieldChange = (field, value) => {
    setAddFields((prevFields) => ({ ...prevFields, [field]: value }));
  };

  const onUpdateFieldChange = (field, value) => {
    setEditModalResponseBody((prevFields) => ({ ...prevFields, [field]: value }));
  };

  const onFetchClientEndpointsFieldChange = (field, value) => {
    setFetchClientEndpointsFields((prevFields) => ({ ...prevFields, [field]: value }));
  };

  const onFetchSingleEndpointFieldChange = (field, value) => {
    setFetchSingleEndpointFields((prevFields) => ({ ...prevFields, [field]: value }));
  };

  const handleAdd = () => {
    setAddModalIsOpen(true);
  };

  const onSubmit = async () => {
    try {
      if (addFields.clientID === "") {
        toast.warn("Please fill in the Client ID field")
        return
      }

      if (addFields.endpointPath === "") {
        toast.warn("Please fill in the Endpoint Path field")
        return
      }

      if (addFields.method === "") {
        toast.warn("Please fill in the Method Path field")
        return
      }

      if (addFields.responseBody === "") {
        toast.warn("Please fill in the Response Body Path field")
        return
      }

      await api.post('/addEndpoint', {
        ...addFields,
        responseBody: JSON.parse(addFields.responseBody),
      });
      toast.success('Endpoint added successfully!')
      fetchAllData();
      clearInputsaddFields()
      closeAddModal()
    } catch (error) {
      toast.error(error.response.data)
      console.error('Error adding endpoint:', error);
    }
  };

  const handleEdit = (clientID, endpoint) => {
    console.log(clientID, endpoint);
    setEditModalResponseBody({
      clientID: clientID,
      endpointPath: endpoint.path,
      method: endpoint.method,
      responseBody: endpoint.Response.body,
    })
    setEditModalIsOpen(true);
  };

  const updateEndpoint = async () => {
    try {
      if (editModalResponseBody.clientID === "") {
        toast.warn("Please fill in the Client ID field")
        return
      }

      if (editModalResponseBody.endpointPath === "") {
        toast.warn("Please fill in the Endpoint Path field")
        return
      }

      if (editModalResponseBody.method === "") {
        toast.warn("Please fill in the Method Path field")
        return
      }

      if (editModalResponseBody.responseBody === "") {
        toast.warn("Please fill in the Response Body Path field")
        return
      }
      await api.patch(`/${editModalResponseBody.clientID}/${editModalResponseBody.endpointPath}`, {
        method: editModalResponseBody.method,
        responseBody: JSON.parse(editModalResponseBody.responseBody)
      });
      toast.success('Endpoint updated successfully!')
      fetchAllData();
    } catch (error) {
      toast.error('Error updating endpoint')
      console.error('Error updating endpoint:', error);
    }
  };

  const handleDelete = async (clientID, endpoint) => {
    try {
      await api.delete(`/${clientID}/${endpoint.path}`);
      toast.success('Endpoint deleted successfully!');
      fetchAllData();
      setIsConfirming(false);
    } catch (error) {
      toast.error('Error deleting endpoint');
      console.error('Error deleting endpoint:', error);
    }
  };

  const fetchAllData = async () => {
    try {
      const response = await api.get('/getAllData');
      setAllData(response.data.data);
    } catch (error) {
      console.error('Error fetching all data:', error);
    }
  };

  const handleFetchSingle = (clientID, endpoint) => {
    setFechSingleModalIsOpen(true);
    fetchSingleEndpoint(clientID, endpoint)
  };

  const fetchSingleEndpoint = async (clientID, endpoint) => {
    try {
      const response = await api.get(`/consumeAPI/${clientID}/${endpoint.path}`);
      setSingleEndpoint(response.data);
      setUrlEndpoint(response.request.responseURL)
    } catch (error) {
      console.error('Error fetching single endpoint:', error);
      setSingleEndpoint(null);
    }
  };

  const fetchClientEndpoints = async () => {
    try {
      if (fetchClientEndpointsFields.clientID === "") {
        toast.warn("Please fill in the Client ID field")
        return
      }
      const response = await api.get(`/getAllEndpointsByClient/${fetchClientEndpointsFields.clientID}`);
      setClientEndpoints(response.data.endpoints);
    } catch (error) {
      console.error('Error fetching client endpoints:', error);
    }
  };

  const closeEditModal = () => {
    setEditModalIsOpen(false);
  };

  const closeAddModal = () => {
    setAddModalIsOpen(false);
  };

  const closeFechSingleModal = () => {
    setFechSingleModalIsOpen(false);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const itemsPerPage = 10;

  const paginatedData = allData.flatMap((clientData) => {
    const endpoints = Array.isArray(clientData.Endpoints) ? clientData.Endpoints : [clientData.Endpoints];
    return endpoints.map((endpoint) => ({ ...clientData, Endpoints: [endpoint] }));
  });

  const totalItems = paginatedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const slicedData = paginatedData.slice(startIndex, endIndex);

  const handleConfirm = () => {
    setIsConfirming(true);
  };

  const handleCancel = () => {
    setIsConfirming(false);
  };

  return (
    <div className="App">
      <div className='box-fetch-cliente'>
        <div className="box-logo-and-add-endpoint">
          <h2>All Data</h2>
          <button className="btn-icon add" onClick={() => { handleAdd(); }}><FontAwesomeIcon icon={faAdd} className="icon" />Add Endpoint</button>
        </div>
        <div className='table-container'>
          <table className="data-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Endpoint</th>
                <th>URL</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {slicedData.map(clientData => (
                clientData.Endpoints.map(endpoint => (
                  <tr key={endpoint.id}>
                    <td>
                      {clientData.clientID}
                    </td>
                    <td>
                      {endpoint.path}
                    </td>
                    <td>
                      {`${api.defaults.baseURL}/consumeAPI/${clientData.clientID}/${endpoint.path}`}
                    </td>
                    <td className='box-button-table'>
                      {isConfirming ? (
                        <div>
                          <button className="btn-icon yes" onClick={() => handleDelete(clientData.clientID, endpoint)}><FontAwesomeIcon icon={faCheck} className="icon" />Yes</button>
                          <button className="btn-icon cancel" onClick={handleCancel}><FontAwesomeIcon icon={faCancel} className="icon" />Cancel</button>
                        </div>
                      ) : (
                        <div>
                          <button className="btn-icon view" onClick={() => { handleFetchSingle(clientData.clientID, endpoint) }}><FontAwesomeIcon icon={faEye} className="icon" /> View</button>
                          <button className="btn-icon edit" onClick={() => { handleEdit(clientData.clientID, endpoint); }}><FontAwesomeIcon icon={faEdit} className="icon" /> Edit</button>
                          <button className="btn-icon delete" onClick={handleConfirm}><FontAwesomeIcon icon={faTrash} className="icon" /> Delete</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>

      <div className='box-fetch-cliente'>
        <h2>Client Endpoints</h2>
        <InputField
          label="Client ID"
          value={fetchClientEndpointsFields.clientID}
          onChange={(value) => onFetchClientEndpointsFieldChange('clientID', value)}
        />
        <button className='btn-client-endpoint fetch' onClick={fetchClientEndpoints}> <FontAwesomeIcon icon={faPaperPlane} className="icon" /> Fetch Client Endpoints</button>
        <button className='btn-client-endpoint clear' onClick={clearInputsFetchClient}><FontAwesomeIcon icon={faBroom} className="icon" /> Clear Inputs</button>
        <ul className="data-list">
          {clientEndpoints.map((endpoint) => (
            <li key={endpoint.id}>
              <SyntaxHighlighter language="json" style={nord} showLineNumbers wrapLongLines>
                {JSON.stringify(endpoint, null, 2)}
              </SyntaxHighlighter>
            </li>
          ))}
        </ul>
      </div>

      <EditEndpointModal
        isOpen={editModalIsOpen}
        onRequestClose={closeEditModal}
        fields={editModalResponseBody}
        onFieldChange={onUpdateFieldChange}
        onSubmit={updateEndpoint}
      />
      <AddEndpointForm
        isOpen={addModalIsOpen}
        onRequestClose={closeAddModal}
        fields={addFields}
        onFieldChange={onAddFieldChange}
        onSubmit={onSubmit}
        clearInputsaddFields={clearInputsaddFields}
      />
      <FetchSingleEndpointModal
        isOpen={fechSingletModalIsOpen}
        onRequestClose={closeFechSingleModal}
        onSubmit={fetchSingleEndpoint}
        clearInputsFetchSingle={clearInputsFetchSingle}
        onFieldChange={onFetchSingleEndpointFieldChange}
        fields={fetchSingleEndpointFields}
        urlEndpoint={urlEndpoint}
        singleEndpoint={singleEndpoint}
      />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default Home;