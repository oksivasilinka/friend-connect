import axios from 'axios'

export const newsAPI = {
    getNews: (country: string = 'us', category: string = '') => {
        return axios.get<newsResponse>(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=0cf1e11d29844bf3b420111e32430e4a`)
    }
}

export type Source = {
    id?: any;
    name: string;
}

export type Articles = {
    source: Source;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export type newsResponse = {
    status: string;
    totalResults: number;
    articles: Articles[];
}