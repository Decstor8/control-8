import './App.css';
import AppBar from './components/AppBar/AppBar';
import { Routes, Route } from 'react-router-dom';
import AllQuotes from './containers/AllQuotes/AllQuotes';
import NewQuote from './containers/NewQuote/NewQuote';
import Quotes from './containers/Quotes/Quotes';

function App() {
    return (
        <>
            <header>
                <AppBar />
            </header>
            <main className='container-fluid'>
                <Routes>
                    <Route path='/' element={<AllQuotes />} />
                    <Route path='/quotes/:category' element={<Quotes />} />
                    <Route path='/add-quote' element={<NewQuote />} />
                    <Route path='/edit-quote/:id' element={<NewQuote />} />
                    <Route path='*' element={<h1>Not Found</h1>} />
                </Routes>
            </main>
        </>
    );
}

export default App;
