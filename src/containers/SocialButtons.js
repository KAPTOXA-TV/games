import React from "react";
import classNames from "classnames";

function SocialButton(props) {
    return (
        <a
            className={classNames("social_button", props.className)}
            href={props.href}
            target="_blank"
        ></a>
    );
}
export function SocialButtons() {
    return (
        <div className="social_buttons">
            <SocialButton
                className="twitch"
                href={"https://www.twitch.tv/k_a_p_t_o_x_a"}
            ></SocialButton>
            <SocialButton
                className="youtube"
                href={
                    "https://www.youtube.com/channel/UCe5TJy9KuTeLUljjJdpRQQg"
                }
            ></SocialButton>
        </div>
    );
}
