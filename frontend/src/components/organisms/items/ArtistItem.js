import { useContext } from "react";
import { MultiContext } from "../../../App";

export default function ArtistItem({ item, className = "" }) {
  const multiCtx = useContext(MultiContext);

  return (
    <div
      onClick={() =>
        multiCtx.setSelectedArtist(
          item === multiCtx.selectedArtist ? null : item
        )
      }
      className={
        className +
        " artist-item" +
        (multiCtx.selectedArtist === item ? " active" : "")
      }>
      <i className="bi bi-person-fill me-2"></i>
      <div className="text-truncate">{item.name}</div>
    </div>
  );
}
