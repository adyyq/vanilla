/**
 * @author Stéphane LaFlèche <stephane.l@vanillaforums.com>
 * @copyright 2009-2019 Vanilla Forums Inc.
 * @license GPL-2.0-only
 */

import React from "react";
import Heading, { ICommonHeadingProps } from "@library/layout/Heading";
import { frameHeaderClasses } from "@library/layout/frame/frameStyles";
import { t } from "@library/utility/appUtils";
import Button from "@library/forms/Button";
import { ButtonTypes } from "@library/forms/buttonStyles";
import { leftChevron } from "@library/icons/common";
import CloseButton from "@library/navigation/CloseButton";
import classNames from "classnames";

export interface IFrameHeaderProps extends ICommonHeadingProps {
    closeFrame?: (e) => void; // Necessary when in modal, but not if in flyouts
    onBackClick?: () => void;
    srOnlyTitle?: boolean;
    titleID?: string;
    children?: React.ReactNode;
}

/**
 * Generic header for frame
 */
export default class FrameHeader extends React.PureComponent<IFrameHeaderProps> {
    public static defaultProps = {
        heading: 2,
        srOnlyTitle: false,
    };

    public render() {
        const backTitle = t("Back");
        const classes = frameHeaderClasses();

        let backLink;
        if (this.props.onBackClick) {
            backLink = (
                <Button
                    title={backTitle}
                    aria-label={backTitle}
                    baseClass={ButtonTypes.ICON_COMPACT}
                    onClick={this.props.onBackClick}
                    className={classNames("frameHeader-backButton", classes.backButton)}
                >
                    {leftChevron("frameHeader-backIcon isSmall", true)}
                </Button>
            );
        }

        let closeButton;
        if (this.props.closeFrame) {
            closeButton = (
                <div className={classNames("frameHeader-closePosition", classes.action)}>
                    <CloseButton className="frameHeader-close" onClick={this.props.closeFrame} />
                </div>
            );
        }

        return (
            <header className={classNames("frameHeader", this.props.className, classes.root)}>
                <Heading
                    id={this.props.titleID}
                    title={this.props.title}
                    depth={this.props.depth}
                    className={classNames("frameHeader-heading", classes.heading, {
                        "sr-only": this.props.srOnlyTitle,
                    })}
                >
                    {backLink}
                    {this.props.title}
                </Heading>
                {this.props.children}
                {closeButton}
            </header>
        );
    }
}
