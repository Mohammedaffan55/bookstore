// Covers are drawn with CSS so the app needs no image files or network access.
export default function BookCover({ book, size = 'md' }) {
  return (
    <div
      className={`cover cover-${size}`}
      style={{ background: `linear-gradient(160deg, ${book.colors[0]}, ${book.colors[1]})` }}
      role="img"
      aria-label={`Cover of ${book.title}`}
    >
      <span className="cover-title">{book.title}</span>
      <span className="cover-author">{book.author}</span>
    </div>
  );
}
