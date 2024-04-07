import { Link } from "react-router-dom"
import "./ActorCard.css"

export const ActorCard = ({ actor }) => {

    const imgUrl = `https://image.tmdb.org/t/p/w300${actor.profile_path}`

    const genericPerson = `./src/img/generic_person.png`

    const actorName = actor.name

    return (
        (actor.known_for_department === "Acting" && (
            <li className="actorCard">
            <Link to={`/peliculasActor/${actor.id}`}>
                {actor.profile_path ? (
                    <img src={imgUrl} alt={actorName} className="actorImage" />
                ) : (
                    <div className="genericPersonContainer">
                        <img src={genericPerson} alt="Generic Person" className="genericPersonImage" />
                    </div>
                )}
                <div className="actorName">{actorName}</div>
            </Link>
        </li>
        ))
    )
}  