import { useEffect } from 'react';
import { resetSelectedToken } from '../storage/token';

function Home() {
  useEffect(() => {
    resetSelectedToken();
  }, []);

  return <div className="flex flex-col items-center flex-grow pb-24"></div>;
}

export default Home;
