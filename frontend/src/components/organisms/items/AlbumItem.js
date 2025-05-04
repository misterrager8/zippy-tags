import { useContext } from "react";
import { MultiContext } from "../../../App";

export default function AlbumItem({ item, className = "" }) {
  const multiCtx = useContext(MultiContext);

  return (
    <div
      onClick={() =>
        multiCtx.setSelectedAlbum(item === multiCtx.selectedAlbum ? null : item)
      }
      className={
        className +
        " album-item" +
        (multiCtx.selectedAlbum === item ? " active" : "")
      }>
      <i className="bi bi-disc-fill me-2"></i>
      <div className="text-truncate">{item.name}</div>
    </div>
  );
}
