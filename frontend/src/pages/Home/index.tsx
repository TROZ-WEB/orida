import useSelector from "@hooks/useSelector";
import React from "react";

function HomePage() {
    const auth = useSelector(state => state.auth);

    console.log({ auth });

    return <h1>{`Bienvenue ${auth.email}`}</h1>;
}

export default HomePage;
