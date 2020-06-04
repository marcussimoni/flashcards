import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import {MenuContent, ItemMenu, Content, MenuIcon, List} from './style';

const Menu = () => {
    return (
        <Content>
            <MenuIcon>
                <FontAwesomeIcon icon={faList}></FontAwesomeIcon>
                <MenuContent>
                    <List>
                        <li>
                            <ItemMenu>
                                <Link className="link" to="/deck/new">New deck</Link>
                            </ItemMenu>
                        </li> 
                        <li>
                            <ItemMenu>
                                <Link className="link" to="/deck">Decks</Link>
                            </ItemMenu>
                        </li>
                        <li>
                            <ItemMenu>
                                <Link className="link" to="/flashcards">Flashcards</Link>
                            </ItemMenu>
                        </li>
                        <li>
                            <ItemMenu>
                                <Link className="link" to="/test-result">Test results</Link>
                            </ItemMenu>
                        </li>
                    </List>
                </MenuContent>
            </MenuIcon>
        </Content>
    )
}

export default Menu

