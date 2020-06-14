import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard, faListAlt } from "@fortawesome/free-solid-svg-icons";
import { LinkComponent, Ul } from './style';
import ReactTooltip from "react-tooltip";

const Menu = () => {
    return (
        <Ul>
            <ReactTooltip id="tooltip" delayShow={300} place="right" type="dark" effect="float"/>
            <li>
                <Link to="/deck" data-for="tooltip" data-tip="List created decks">
                    <LinkComponent>
                        <FontAwesomeIcon icon={faListAlt}></FontAwesomeIcon>
                        &nbsp;Decks
                    </LinkComponent>
                </Link>
            </li>
            <li>
                <Link to="/" data-for="tooltip" data-tip="Start study with flashcards">
                    <LinkComponent>
                        <FontAwesomeIcon icon={faIdCard}></FontAwesomeIcon>
                        &nbsp;Flashcards
                    </LinkComponent>
                </Link>
            </li>
        </Ul>
    )
}

export default Menu

