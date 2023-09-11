import React, {ComponentType} from "react";
import {Preloader} from "../Components/common/preloader/preloader";


export const withSuspense = (Component: ComponentType) => {
    return (props: any) => {
        return <React.Suspense fallback={<Preloader/>}>
            <Component {...props}/>
        </React.Suspense>
    }

}