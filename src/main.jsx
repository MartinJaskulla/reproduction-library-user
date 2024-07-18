import * as ReactDOM from "react-dom/client";
import * as React from "react";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import {
    createTheme,
    ThemeProvider,
    // TODO Not working
    Button,
} from "reproduction-library";
// TODO Also works in shadow DOM
// import {Button} from "@mui/material";

export class ShadowedApp extends HTMLElement {
    constructor() {
        super();
        const shadowContainer = this.attachShadow({ mode: "open" });
        const shadowRootElement = document.createElement("div");
        shadowContainer.appendChild(shadowRootElement);
        const cache = createCache({
            key: "css",
            prepend: true,
            container: shadowContainer,
        });
        const shadowTheme = createTheme({
            components: {
                MuiPopover: {
                    defaultProps: {
                        container: shadowRootElement,
                    },
                },
                MuiPopper: {
                    defaultProps: {
                        container: shadowRootElement,
                    },
                },
                MuiModal: {
                    defaultProps: {
                        container: shadowRootElement,
                    },
                },
            },
        });
        ReactDOM.createRoot(shadowRootElement).render(
            <React.StrictMode>
                <CacheProvider value={cache}>
                    <ThemeProvider theme={shadowTheme}>
                        <h1>Inside shadow DOM</h1>
                        <Button>Hi</Button>
                    </ThemeProvider>
                </CacheProvider>
            </React.StrictMode>,
        );
    }
}

window.customElements.define('my-custom-element', ShadowedApp)

ReactDOM.createRoot(document.querySelector('#root')).render(
    <React.StrictMode>
            <ThemeProvider theme={createTheme()}>
                <h1>Outside shadow DOM</h1>
                <Button>Hi</Button>
            </ThemeProvider>
    </React.StrictMode>,
);



