import { useContext } from "react";
import { MultiContext } from "../../../App";

export default function SongItem({ item, className = "" }) {
  const multiCtx = useContext(MultiContext);

  return (
    <div
      title={item.name}
      onClick={() =>
        multiCtx.setSelectedSong(item === multiCtx.selectedSong ? null : item)
      }
      className={
        className +
        " track-item" +
        (multiCtx.selectedSong === item ? " active" : "")
      }>
      <i className="bi bi-music-note me-2"></i>
      <div className="text-truncate">{item.name}</div>
    </div>
  );
}
