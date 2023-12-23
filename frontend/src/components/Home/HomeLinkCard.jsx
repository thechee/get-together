import { Link } from "react-router-dom"
import './HomeLinkCard.css'

export const HomeLinkCard = ({ activeLink, image, path, linkText }) => {
  return (
    <Link to={path} className={activeLink}>
      <div className="home-link-card">
      <img className="home-link-img" src={image}></img>
      <Link className={`home-link ${activeLink}`} to={path}>{linkText}</Link>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
    </Link>

  )
}