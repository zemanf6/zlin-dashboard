import { useState } from "react";
import { ExternalLink, Newspaper, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { boardPosts, type BoardPost } from "../data/boardData";
import { BackButton } from "../components/common/BackButton";
import "../styles/board.css";

export function BoardPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<BoardPost | null>(null);

  return <main className="board-page"><div className="board-page__inner">
    <BackButton className="board-back" label="Zpět na nástěnku portálu" onClick={() => navigate("/")} />
    <header className="board-hero"><span><Newspaper size={30} /></span><div><p>Nástěnka města</p><h1>Co je nového ve Zlíně</h1><small>Novinky, pozvánky a praktické informace pro obyvatele města.</small></div></header>
    <div className="board-layout"><section className="board-feed" aria-label="Příspěvky města">{boardPosts.map((post) => { const Icon = post.icon; return <article className={post.featured ? "board-post is-featured" : "board-post"} key={post.id}>
        <header className="board-post__author"><span><Icon size={20} /></span><div><strong>{post.author}</strong><small>{post.authorRole} · <time>{post.date} v {post.time}</time></small></div><b>{post.categoryLabel}</b></header>
        {post.imageUrl && <img className="board-post__image" src={post.imageUrl} alt="" loading="lazy" />}
        <div className="board-post__body"><h2>{post.title}</h2><p>{post.body}</p></div>
        <footer><button type="button" onClick={() => setSelected(post)}>Zobrazit podrobnosti</button><a href={post.articleUrl} target="_blank" rel="noreferrer">Více na zlin.eu <ExternalLink size={16} /></a></footer>
      </article>; })}</section>
      <aside className="board-about"><Newspaper size={23} /><h2>Novinky bez zahlcení</h2><p>Nástěnka obsahuje běžné příspěvky města. Osobní zprávy a důležitá upozornění najdete pod zvonečkem.</p><button type="button" onClick={() => navigate("/profil")}>Nastavit odběr příspěvků</button></aside>
    </div>
    {selected && <div className="board-modal" role="dialog" aria-modal="true" aria-labelledby="board-detail-title" onClick={() => setSelected(null)}><article onClick={(event) => event.stopPropagation()}><button type="button" onClick={() => setSelected(null)} aria-label="Zavřít detail"><X size={20} /></button><span>{selected.categoryLabel}</span><time>{selected.date} v {selected.time} · {selected.author}</time><h2 id="board-detail-title">{selected.title}</h2><p>{selected.body}</p><a href={selected.articleUrl} target="_blank" rel="noreferrer">Přečíst celý článek na zlin.eu <ExternalLink size={16} /></a><small>Publikoval: {selected.authorRole}</small></article></div>}
  </div></main>;
}
