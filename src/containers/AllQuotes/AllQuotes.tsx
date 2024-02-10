import { useState, useEffect, useCallback } from 'react';
import axiosApi from '../../axiosApi';
import { ApiQuote } from '../../types';
import { categories } from "../../categories";
import {Link, useParams} from "react-router-dom";

const AllQuotes = () => {
    const [quotes, setQuotes] = useState<ApiQuote[]>([]);

    const params = useParams();

    const fetchQuotes = useCallback(async () => {
            const response = await axiosApi.get<Record<string, ApiQuote> | null>('/quotes.json');
            const posts = response.data;
            if (posts) {
                const quotesArray = Object.values(posts);
                setQuotes(quotesArray);
            } else {
                setQuotes([]);
            }
    }, [params.id]);

    useEffect(() => {
        fetchQuotes();
    }, []);

    const deletePost = async () => {
        await axiosApi.delete('/quotes/' + params.id + '.json');
    };


    const handleDelete = async () => {
        await deletePost();
        window.location.href = '/';
    };

    return (
        <div className='mt-3 d-flex flex-column gap-3'>
            <h1>Список цитат</h1>
            <div>
                <ul>
                    {categories.map(category => (
                        <li key={category.id}>
                            <Link to={`/quotes/${category.id}`}>{category.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                {quotes.map(quote => (
                    <div className='border border-dark m-3 p-3' key={quote.category}>
                        <strong>Категория:</strong> {quote.category}<br/>
                        <strong>Автор:</strong> {quote.author}<br/>
                        <strong>Цитата:</strong> {quote.text}
                        <div>
                            <button className='btn mt-2' onClick={handleDelete}>Delete</button>
                            <Link to={'/posts/' + params.id + '/edit'} className='btn mt-2'>Edit</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllQuotes;
