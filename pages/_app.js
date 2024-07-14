import '../app/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ChatBot from '../components/ChatBot';
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <ChatBot />
    </>
  );
}

export default MyApp;

