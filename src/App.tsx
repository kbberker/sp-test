import { useRef, useState } from 'react';
import WebServerLogResults from './components/WebServerLogResults';

function App() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [listOfPageVisits, setListOfPageVisits] = useState<string[]>([]);

  const fileReader = new FileReader();
  let fileContents: string;

  const readFileInput = () => {
    const fileList = fileInputRef!.current;

    if (fileList && fileList.files) {
      fileReader.readAsText(fileList!.files[0]);
    }

    fileReader.onloadend = () => {
      fileContents = fileReader.result!.toString();
      setListOfPageVisits(fileContents.split(/[\r\n]+/));
    };
  };

  return (
    <>
      <div>
        <label htmlFor="file-input">
          Please choose your log file:
          <input ref={fileInputRef} type="file" name="file-input" accept=".log" />
        </label>
        <div>
          <button type="button" onClick={readFileInput}>Submit</button>
        </div>
      </div>
      <div>
        <WebServerLogResults rawLogData={listOfPageVisits} />
      </div>
    </>
  );
}

export default App;
