import { Link } from "react-router-dom"
import './HomeLinkCard.css'

export const HomeLinkCard = ({ image, path, linkText, description }) => {
  return (
    <div>
      <img src={image}></img>
      <Link to={path}>{linkText}</Link>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat cupiditate quae suscipit perferendis voluptatem obcaecati distinctio nostrum explicabo atque id fugit, exercitationem consectetur minus eaque, ipsum ab reiciendis corrupti ullam.</p>
    </div>
  )
}