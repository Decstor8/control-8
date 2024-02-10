import React, { useEffect, useState, ChangeEvent } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axiosApi from '../../axiosApi';
import { ApiQuote } from '../../types';
import { categories } from '../../categories';

const NewQuote = () => {
    const { id } = useParams<{ id: string }>();
    const [quote, setQuote] = useState<ApiQuote>({
        category: '',
        author: '',
        text: '',
    });

    useEffect(() => {
        if (id) {
            fetchQuote();
        }
    }, [id]);

    const fetchQuote = async () => {
        try {
            const response = await axiosApi.get<ApiQuote>(`/quotes/${id}.json`);
            setQuote(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке цитаты:', error);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setQuote(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (id) {
                await axiosApi.put(`/quotes/${id}.json`, quote);
            } else {
                await axiosApi.post('/quotes.json', quote);
            }
            setQuote({ category: '', author: '', text: '' });
        } catch (error) {
            console.error('Ошибка при создании/обновлении цитаты:', error);
        }
    };

    return (
        <div>
            <h2>{id ? 'Редактирование цитаты' : 'Новая цитата'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="author" className="form-label">Автор</label>
                    <input
                        type="text"
                        className="form-control"
                        id="author"
                        name="author"
                        value={quote.author}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Категория</label>
                    <select
                        className="form-select"
                        id="category"
                        name="category"
                        value={quote.category}
                        onChange={handleChange}
                    >
                        <option value="">Выберите категорию</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category.id}>{category.title}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Цитата</label>
                    <textarea
                        className="form-control"
                        id="text"
                        name="text"
                        value={quote.text}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">{id ? 'Обновить' : 'Создать'}</button>
                <NavLink to="/" className="btn btn-danger m-3">Главная страница</NavLink>
            </form>
        </div>
    );
};

export default NewQuote;
