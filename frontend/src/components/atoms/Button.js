export default function Button({
  className = "",
  text,
  onClick,
  icon,
  border = true,
  size = "sm",
  active = false,
  type_ = "button",
}) {
  return (
    <button
      type={type_}
      onClick={onClick}
      className={
        className +
        " btn" +
        (active ? " active" : "") +
        (border ? "" : " border-0") +
        (size ? ` btn-${size}` : "")
      }>
      {icon && <i className={"bi bi-" + icon + (text ? " me-2" : "")}></i>}
      {text}
    </button>
  );
}
