import { h, Fragment } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';

// <header class={style.header}>
// 			<Link activeClassName={style.active} href="/profile">Me</Link>

const Header = () => (
    <Fragment>
         <div class={style.header}
          role="navigation"
          lang="fi"
          tabIndex="0"
          aria-label="Ohjelmalähteet ja ulkoasu (musta tai valkoinen)"
        >
		<h1>Tv-ohjelmat</h1>
		<nav>
        <a href="/">Yle</a> |
  <a href="/amppari/">amppari</a> |
  <a href="/js/">JavaScript</a> |
  <a href="/python/">Python</a>
		</nav>
        </div>
    </Fragment>
);

export default Header;