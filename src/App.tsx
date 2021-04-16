import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Service } from './service';

function App() {
  const [result, setResult] = React.useState<any>();

  const service = React.useMemo(() => new Service(), []);

  const delay = async() => new Promise((res) => setTimeout(res,1000));

  React.useEffect(() => {
    (async()=> {
      let res = await service.getDeliveryOptions('a9f1109f-ec2e-456c-ba1b-b9bac70dc8f9');
      setResult(res);
      await delay(); 
      res = await service.getDeliveryOptions('a9f1109f-ec2e-456c-ba1b-b9bac70dc8f9');
      setResult(res);
      await delay(); 
      res = await service.getDeliveryOptions('a9f1109f-ec2e-456c-ba1b-b9bac70dc8f9');
      setResult(res);
    })();
  }, [service])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <pre>
          {JSON.stringify(result, null, 2)}
        </pre>
      </header>
    </div>
  );
}

export default App;
