import { fetchTMDBMovies } from "../services/tmdb.service.js"

export const getTrendingTv = async (req, res) => {
    try {
        const data = await fetchTMDBMovies('https://api.themoviedb.org/3/trending/tv/day?language=en-US')
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)]
        return res.status(200).json({content: randomMovie})
    } catch (error) {
        console.log("Error in getTrendingmovies controller")
        res.status(500).json({error: "Internal server error"})
    }
}

export const getTvTrailers = async (req, res) => {
    try {
        const { id } = req.params
        const data = await fetchTMDBMovies(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`)
        return res.status(200).json({ trailers: data.results})
    } catch (error) {
        console.log("Error in fetchmovie trailers controller")   
        if (error.message.includes('404')) {
            return res.status(404).send(null)
        }
        return res.status(500).json({error: "Internal server error"})
    }
}

export const getTvDetails = async (req, res) => {
    try {
        const { id } = req.params
        const data = await fetchTMDBMovies(`https://api.themoviedb.org/3/tv/${id}?language=en-US`)
        return res.status(200).json({content: data})
        
    } catch (error) {
        console.log('Error in getmovie detail controller')
        if (error.message.includes('404')) {
            return res.status(404).send(null)
        }
        return res.status(500).json({error: "Internal server error"})
    }
}

export const getSimilarTv = async (req, res) => {
    try {
        const { id } = req.params
        const data = await fetchTMDBMovies(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`)
        return res.status(200).json({content: data.results})
        
    } catch (error) {
        console.log("error in getsimilarmovie controller")
        if (error.message.includes('404')) {
            return res.status(404).send(null)
        }
        return res.status(500).json({error: 'Internal Server Error'})
    }

}

export const getTvByCategory = async (req, res) => {
    const { category } = req.params
    try {
        const data = await fetchTMDBMovies(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`)
        return res.status(200).json({content: data.results})
        
    } catch (error) {
        console.log('error in getmoviebycategory controller')
        if (error.message.includes('404')) {
            return res.status(404).send(null)
        }
        return res.status(500).json({error: 'Internal server error'})
    }
}