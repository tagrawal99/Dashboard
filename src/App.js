import './App.css';
import { useState, useCallback} from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import { BrowserRouter, Route, Routes} from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Summary from './pages/Summary';
import Dashboard from './pages/Dashboard';

function App() { 
  const [parsedCsvData, setParsedCsvData] = useState([]);


  const parseFile = file => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines:'greedy',
      complete: results => {
        setParsedCsvData(results.data);
      },
    });
  
  };
  
  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length) {
      parseFile(acceptedFiles[0]);
    }
   
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: 'text/csv',
  });
  return (
    <div className="App">
      {/* <div
        {...getRootProps({
          className: `dropzone 
          ${isDragAccept && 'dropzoneAccept'} 
          ${isDragReject && 'dropzoneReject'}`,
        })}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div> */}
      <BrowserRouter>
        <Sidebar>
        <div
        {...getRootProps({
          className: `dropzone 
          ${isDragAccept && 'dropzoneAccept'} 
          ${isDragReject && 'dropzoneReject'}`,
        })}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <><label class="form-label" for="customFile">INSERT FILE</label>
          <input style = {{paddingLeft: "30px"}}type="file" class="form-control" id="customFile" /><br></br></>
        )}
      </div>

          <Routes>
            <Route path='/' element={<Dashboard parsedData = {parsedCsvData} />} />
            <Route path='/summary' element={<Summary/>} />
          </Routes>
        </Sidebar>
      </BrowserRouter>
          {/* <Dashboard parsedData = {parsedCsvData} /> */}
    </div>
  );
}

export default App;