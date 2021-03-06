import React, { useEffect, useState } from 'react';
import StartZookeeper from './StartZookeeper';
import Main from './Main';
import Loader from 'react-loader-spinner';
import constants from '../UIComponents/constants';
import FlexContainer from '../UIComponents/FlexContainer';

interface StatusModel {
  zookeeper: '' | 'Offline' | 'Online',
  kafka: '' | 'true' | 'false'
}

const App = () => {
  // State hook for Zookeeper server status
  const [status, setStatus] = useState<StatusModel>({
    zookeeper: '',
    kafka: ''
  });

  // Sends GET request when app initializes to receive status on Zookeeper server
  // TODO: Figure out how to check Zookeeper status on Windows
  useEffect(() => {
    if (navigator.userAgent.toLowerCase().indexOf('windows') < 0) { // Check for user's operating system, only perform if not Windows
      fetch('/checkStatus')
        .then(res => res.json())
        .then(status => {
          setStatus(status);
        })
        .catch(err => {
          throw new Error('Error in fetching Zookeeper status: ' + err);
        });
    } else {
      setStatus({
        zookeeper: 'Online',
        kafka: 'true'
      });
    }
  }, []);

  if (status.zookeeper === 'Offline') {
    return <StartZookeeper setStatus={setStatus} />;
  } else if (status.zookeeper === 'Online') {
    return <Main status={status.kafka} />;
  } else {
    // Load loading bar
    return (
      <FlexContainer addlStyles={`width: 100%; height: 100%;`}>
        <Loader
          type='ThreeDots'
          color={constants.GREEN}
          height={80}
          width={80}
        />
      </FlexContainer>
    );
  }
};

export default App;
