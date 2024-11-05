import { fetchFromTMDB } from "../services/tmdb.service.js";
export const getrendingMovies = async (req, res) =>{
    try {
        const data  = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US")
        const randomMovie = data.results[Math.floor(Math.random()* data.results?.length)]

        res.status(200).json({success: true, content: randomMovie})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error', success: false });
    }
}

export const getMoviestrailers = async (req, res) => {
    const { id } = req.params
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`)
        res.status(200).json({ success: true, trailers : data.results })
    } catch (error) {
        if(error.message.includes("404")){
            return res.status(404).send(null)
        } 
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error', success: false });
    }
}

export const getMoviesDetails = async ( req, res ) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`)
        res.status(200).json({ success: true, content: data })
    } catch (error) {
        if(error.message.includes("404")){
            res.status(404).send(null);
        }
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error', success: false});
    }
}

export const getSimilarMovies = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`)
        res.status(200).json({ success: true, similar : data.results })   
    } catch (error) {
        console.log(error);
        if(error.message.includes("404")){
            return res.status(404).send(null)
        } 
        res.status(500).json({ message: 'Internal Server Error', success: false });
    }
}

export const getMoviesByCategory = async (req, res) => {
    const { category  } = req.params;  
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`)
        res.status(200).json({ success: true, content : data.results })
    } catch (error) {
        if(error.message.includes("404")){
            res.status(404).send(null);
        }
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error', success: false });
    }
}