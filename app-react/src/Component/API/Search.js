import React, { useEffect, useState } from 'react';
import axios from "axios";
import useDebounce from '../../hook/useDebou';

const Loading = () => {
    return (
        <div className="flex items-center justify-center h-full">
            <h1>Loading...</h1>
        </div>
    );
};

const Search = () => {

    const [movie, setMove] = useState([])
    const [inputS, setInput] = useState("dragon ball")
    const Debounce = useDebounce(inputS, 1000)
    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${Debounce}&api_key=c71d19f6720ccfe40c7918a3cc5626b4`)
            if (res.data.results) {
                setMove(res.data.results)
            }
        }
        getData()
    }, [Debounce])
    const MovieItem = ({ data }) => {
        return (
            <div className='bg-white p-3 rounded-2xl shadow-sm flex flex-col'>
                <div className='h-[297px]'>
                    <img
                        className='w-full h-full object-cover rounded-lg '
                        src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} alt="" />
                </div>
                <div className="p-7 flex-1 flex flex-col">
                    <h3 className='text-lg text-black font-semibold mb-4'>{data.title}</h3>
                    <p className='text-[#999]  text-sm mb-6 !leading-loose'>
                        {(data.overview).length > 100 ? `${(data.overview).substring(0, 200)} ...` : data.overview}
                    </p>
                    <div className="flex items-center gap-x-3 mt-auto">
                        <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.66713 1.02447C7.7719 0.702008 8.2281 0.702009 8.33287 1.02447L9.71753 5.28602C9.76439 5.43023 9.89877 5.52786 10.0504 5.52786H14.5313C14.8703 5.52786 15.0113 5.96173 14.737 6.16102L11.1119 8.7948C10.9892 8.88393 10.9379 9.04191 10.9847 9.18612L12.3694 13.4477C12.4742 13.7701 12.1051 14.0383 11.8308 13.839L8.20572 11.2052C8.08305 11.1161 7.91695 11.1161 7.79428 11.2052L4.16918 13.839C3.89488 14.0383 3.52581 13.7701 3.63059 13.4477L5.01525 9.18612C5.06211 9.04191 5.01078 8.88393 4.88811 8.7948L1.26301 6.16102C0.988711 5.96173 1.12968 5.52786 1.46874 5.52786H5.9496C6.10123 5.52786 6.23561 5.43023 6.28247 5.28602L7.66713 1.02447Z" stroke="#FFB86C" strokeWidth="1.5" />
                        </svg>
                        <span className='test-sm font-semibold text-[#333]'>{data.vote_average}</span>
                    </div>
                </div>
            </div>
        )
    }
    const handleInputChange = (e) => {
        setInput(e.target.value);
    };
    return (
        <div className='p-10'>
            <div className="w-full max-w-[400px] mx-auto mb-20">
                <input
                    type="text"
                    className='w-full p-3 rounded-lg border border-purple-600 shadow-[0px_0px_0px_3px_rgba(125,_106,_255,_0.3)] focus:outline-none'
                    value={inputS}
                    placeholder='Search Movie ...'
                    onChange={handleInputChange}
                />
            </div>
            <div className='grid grid-cols-4 gap-5'>
                {movie.length > 0 ? (
                    movie.map((item, index) => <MovieItem key={item.id} data={item}></MovieItem>)
                ) : (
                    <Loading></Loading>
                )}
            </div>
        </div>
    );
};

export default Search;