import './App.css';
import { useRef, useState } from 'react';
import WebServerLogResults from './components/WebServerLogResults';

function App() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [listOfSiteVisits, setListOfSiteVisits] = useState<string[]>([]);

  console.log({ listOfSiteVisits });

  const fileReader = new FileReader();
  let fileContents: string;

  const readFileInput = () => {
    console.log('clicked');
    const fileList = fileInputRef!.current;

    if (fileList && fileList.files) {
      fileReader.readAsText(fileList!.files[0]);
    }

    fileReader.onloadend = () => {
      fileContents = fileReader.result!.toString();
      console.log(fileContents.split(/[\r\n]+/));
      setListOfSiteVisits(fileContents.split(/[\r\n]+/));
    };
  };

  return (
    <>
      <div className="App">
        <label htmlFor="file-input">
          Please choose your log file:
          <input ref={fileInputRef} type="file" name="file-input" accept=".log" />
        </label>
        <div>
          <button type="button" onClick={readFileInput}>Submit</button>
        </div>
      </div>
      <div>
        <WebServerLogResults listOfSiteVisits={listOfSiteVisits} />
      </div>
    </>
  );
}

export default App;
