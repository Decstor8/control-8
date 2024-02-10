export interface ApiQuote {
    author: string;
    category: string;
    text: string;
}

export interface Quote extends ApiQuote {
    id: string;
}

export interface ApiQuotes {
    [id: string]: ApiQuote;
}