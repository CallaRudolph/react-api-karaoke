import * as types from "./../constants/ActionTypes";
import v4 from "uuid/v4";

export const nextLine = (songId) => ({
  type: types.NEXT_LINE,
  songId
});

export const restartSong = (songId) => ({
  type: types.RESTART_SONG,
  songId
});

export const selectSong = (songId) => ({
  type: types.SELECT_SONG,
  songId
});

export const requestSong = (title, localSongId) => ({
  type: types.REQUEST_SONG,
  title,
  songId: localSongId
});

export function fetchSongId(title) {
  return function (dispatch) {
    const localSongId = v4();
    dispatch(requestSong(title, localSongId));
    title = title.replace(" ", "_");
    return fetch("http://api.musixmatch.com/ws/1.1/track.search?&q_track=" + title + "&page_size=1&s_track_rating=desc&apikey=bc6b2256711a5fcbd1081e4f496f7b12").then(
      response => response.json(),
      error => console.log("An error occurred.", error)
    ).then(function(json) {
      console.log("CHECK OUT THIS SWEET API RESPONSE:", json)
    });
  };
}
