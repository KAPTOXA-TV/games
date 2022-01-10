import React from "react";
import classNames from "classnames";
import GameState from "../enum/GameState";

function getStateText(state) {
    switch (state) {
        case GameState.COMPLETED:
            return "Пройдена";
        case GameState.NONE:
            return "Нужно пройти";
        case GameState.IN_PROGRESS:
            return "Играю";
        default:
    }
    return "";
}

function Rating(props) {
    const { rating } = props;
    if (!rating) {
        return null;
    }
    return (
        <div className={classNames("rating_block", props.className)}>
            {Array.from({ length: 5 }, (item, i) => (
                <div
                    key={"key_" + i}
                    className={classNames("rating_item", {
                        active: i < rating,
                    })}
                ></div>
            ))}
        </div>
    );
}

function TableColumn(props) {
    return (
        <div className={classNames("table_column", props.className)}>
            {props.children}
        </div>
    );
}
function TableHeader(props) {
    return (
        <div className={classNames("table_header")}>
            <TableColumn key="title" className="title">
                Игра
            </TableColumn>
            <TableColumn key="state" className="state">
                Статус
            </TableColumn>
            <TableColumn key="rating" className="rating">
                Рейтинг
            </TableColumn>
            <TableColumn key="platform" className="platform">
                Платформа
            </TableColumn>
            <TableColumn key="dateEnd" className="dateEnd">
                Дата прохождения
            </TableColumn>
        </div>
    );
}
function ModRow(props) {
    const { mod } = props;
    return (
        <div className={classNames("mod_row", mod.state)}>
            <TableColumn key="title" className="title">
                {mod.url ? (
                    <a href={mod.url} target="_blank">
                        {mod.title}
                    </a>
                ) : (
                    mod.title
                )}
            </TableColumn>
            <TableColumn key="state" className="state">
                {getStateText(mod.state)}
            </TableColumn>
            <TableColumn key="rating" className="rating">
                <Rating rating={mod.rating} />
            </TableColumn>
            <TableColumn key="platform" className="platform"></TableColumn>
            <TableColumn key="dateEnd" className="dateEnd"></TableColumn>
        </div>
    );
}
function TableRow(props) {
    const { game } = props;
    return (
        <div className={classNames("table_row", game.state)}>
            <div className="table_row_content">
                <TableColumn key="title" className="title">
                    {game.url ? (
                        <a href={game.url} target="_blank">
                            {game.title}
                        </a>
                    ) : (
                        game.title
                    )}
                </TableColumn>
                <TableColumn key="state" className="state">
                    {getStateText(game.state)}
                </TableColumn>
                <TableColumn key="rating" className="rating">
                    <Rating rating={game.rating} />
                </TableColumn>
                <TableColumn key="platform" className="platform">
                    {game.platform}
                </TableColumn>
                <TableColumn key="dateEnd" className="dateEnd">
                    {game.dateEnd}
                </TableColumn>
            </div>
            {game.mods ? (
                <div className="table_row_mods">
                    <div className="mods_title">Дополнения/Моды:</div>
                    <div className="mods">
                        {game.mods.map((mod) => (
                            <ModRow key={mod.title} mod={mod} />
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    );
}
export function Table(props) {
    const otherGames = [];
    const currentGames = [];
    const completedGames = [];

    for (let i = 0, len = props.games.length; i < len; i++) {
        let game = props.games[i];
        if (
            game.state === GameState.IN_PROGRESS ||
            (game.mods &&
                game.mods.findIndex(
                    ({ state }) => state === GameState.IN_PROGRESS
                ) !== -1)
        ) {
            currentGames.push(game);
        } else if (game.state === GameState.COMPLETED) {
            completedGames.push(game);
        } else {
            otherGames.push(game);
        }
    }
    const games = [...currentGames, ...otherGames, ...completedGames];
    return (
        <div className="table">
            <TableHeader />
            {games.map((game) => (
                <TableRow key={game.title} game={game} />
            ))}
        </div>
    );
}
