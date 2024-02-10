import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axiosApi from '../../axiosApi';
import { ApiQuote } from '../../types';

const Quotes = () => {
    const { category } = useParams<{ category: string }>();
    const [quotes, setQuotes] = useState<ApiQuote[]>([]);

    const fetchQuotesByCategory = useCallback(async () => {
        try {
            const response = await axiosApi.get<Record<string, ApiQuote> | null>('/quotes.json', {
                params: {
                    orderBy: '"category"',
                    equalTo: `"${category}"`,
                },
            });
            const data = response.data;
            if (data) {
                const quotesArray = Object.values(data);
                setQuotes(quotesArray);
            } else {
                setQuotes([]);
            }
        } catch (error) {
            console.error('Ошибка при загрузке цитат по категории:', error);
        }
    }, [category]);

    useEffect(() => {
        fetchQuotesByCategory();
    }, [fetchQuotesByCategory]);

    return (
        <div>
            <h1>Цитаты из категории "{category}"</h1>
            <div>
                {quotes.map((quote, index) => (
                    <div className='border border-dark m-3 p-3' key={index}>
                        <strong>Автор:</strong> {quote.author}<br />
                        <strong>Цитата:</strong> {quote.text}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Quotes;
