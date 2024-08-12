import { User } from "../models/user.model.js";
import { fetchTMDBMovies } from "../services/tmdb.service.js";

export const searchPerson = async (req, res) => {
  try {
    const { query } = req.params;
    const response = await fetchTMDBMovies(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );
    if (response.length === 0) {
      return res.status(404).json({ error: "No result found" });
    }
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].profile_path,
          title: response.results[0].name,
          searchType: "person",
          createdAt: Date.now(),
        },
      },
    });

    return res.status(200).json({ content: response.results });
  } catch (error) {
    console.log("Error in searchPerson controller");
    return res.status(500).json({ error: "Internal server Error" });
  }
};

export const searchMovie = async (req, res) => {
  try {
    const { query } = req.params;
    const response = await fetchTMDBMovies(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );
    if (response.results.length === 0) {
      return res.status(404).send(null);
    }
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].title,
          searchType: "Movie",
          createdAt: Date.now(),
        },
      },
    });
    return res.status(200).json({ content: response.results });
  } catch (error) {
    console.log("Error in searchMovie controller");
    return res.status(500).json({ error: "Internal server Error" });
  }
};

export const searchTv = async (req, res) => {
  try {
    const { query } = req.params;
    const response = await fetchTMDBMovies(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
    );
    if (response.length === 0) {
      return res.status(404).send(null);
    }
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].title,
          searchType: "Tv",
          createdAt: Date.now(),
        },
      },
    });
    return res.status(200).json({ content: response.results });
  } catch (error) {
    console.log("error in searchtv controller");
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getSearchHistory = async (req, res) => {
  try {
    return res.status(200).json({ content: req.user.searchHistory });
  } catch (error) {
    console.log("error in getsearchhistory controller");
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteFromHistory = async (req, res) => {
  try {
      let { id } = req.params;
      id = parseInt(id)
    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        searchHistory: { id: id },
      },
    });

    return res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    console.log("error in deletefromhistory controller");
    return res.status(500).json({ error: "Internal server error" });
  }
};
