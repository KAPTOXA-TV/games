import React, { useState } from "react";
import games from "../../data/games.json";
import { Table } from "./Table";
import { SocialButtons } from "./SocialButtons";

export function Root(props) {
    const [filteredGames, setFilteredGames] = useState(games);
    const [searchString, setSearchString] = useState("");
    return (
        <div className="root">
            <div className="header"></div>
            <div className="content">
                <div className="page_title">Список Игр</div>
                <SocialButtons />
                <input
                    className="search"
                    value={searchString}
                    placeholder={"Поиск"}
                    onChange={(e) => {
                        let value = e.target.value;
                        setSearchString(value);
                        value = value.toLowerCase();
                        setFilteredGames(
                            games.filter(
                                ({ title, mods }) =>
                                    title.toLowerCase().includes(value) ||
                                    (mods?.length > 0 &&
                                        mods.findIndex(({ title }) =>
                                            title.toLowerCase().includes(value)
                                        ) !== -1)
                            )
                        );
                    }}
                />
                <Table games={filteredGames} />
            </div>
        </div>
    );
}
