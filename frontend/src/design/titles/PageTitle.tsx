import React, { PropsWithChildren } from "react";

interface PageTitleProps {}

function PageTitle({ children }: PropsWithChildren<PageTitleProps>) {
    return (
        <h1 className="text-3xl">{children}</h1>
    );
}

export default PageTitle;
