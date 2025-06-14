---
sidebar_position: 1
sidebar_label: Browser
---
# TLSNotary in React/Typescript with `tlsn-js`

In this quick start you will learn how to use TLSNotary in React/Typescript with the [`tlsn-js`](https://github.com/tlsnotary/tlsn-js) NPM module in the browser.

This quick start uses the react/typescript [demos in `tlsn-js`](https://github.com/tlsnotary/tlsn-js/tree/main/demo/). The `demo` directory contains three demos to quickly bootstrap a webpack app using `tlsn-js`:

1. [`react-ts-webpack`: create an attestation with a Notary and render the result](#react-ts-webpack)
2. [`interactive-demo`: prove data interactively to a Verifier](#interactive-demo)
3. [`web-to-web-p2p`: prove data between two peers, in the browser](#web-to-web-p2p)

## `tlsn-js` in a React/Typescript app {#react-ts-webpack}

In this demo, we will request JSON data from the Star Wars API at https://swapi.dev. We will use `tlsn-js` to notarize the TLS request with TLSNotary and store the result in a *proof*. Then, we will use `tlsn-js` again to verify this *proof*.

> **_NOTE:_** ℹ️ This demo uses TLSNotary to notarize **public** data to simplify the quick start for everyone. For real-world applications, TLSNotary is particularly valuable for notarizing private and sensitive data.

1. Clone the repository
    ```sh
    git clone https://github.com/tlsnotary/tlsn-js
    ```
2. Navigate to the demo directory:
   ```sh
   cd tlsn-js/demo/react-ts-webpack
   ```
3. Checkout the version of this quick start:
   ```sh
   git checkout v0.1.0-alpha.11
   ```
4. If you want to use a local TLSNotary server: [Run a local notary server and websocket proxy](#local), otherwise:
   1. Open `app.tsx` in your favorite editor.
   2. Replace `notaryUrl: 'http://localhost:7047',` with:
      ```ts
         notaryUrl: 'https://notary.pse.dev/v0.1.0-alpha.11',
      ```
      This makes this webpage use the [PSE](https://pse.dev) notary server to notarize the API request. Feel free to use different or [local notary](#local); a local server will be faster because it removes the bandwidth constraints between the user and the notary.
   3. Replace `websocketProxyUrl: 'ws://localhost:55688',` with:
        ```ts
            websocketProxyUrl: 'wss://notary.pse.dev/proxy?token=swapi.dev',
        ```
      Because a web browser doesn't have the ability to make TCP connection, we need to use a websocket proxy server. This uses a proxy hosted by [PSE](https://pse.dev). Feel free to use different or [local notary](#local) proxy.
   4. In `package.json`: check the version number:
      ```json
          "tlsn-js": "v0.1.0-alpha.11"
      ```
5. Install dependencies
    ```sh
    npm i
    ```
6. Start Webpack Dev Server:
    ```sh
    npm run dev
    ```
7. Open `http://localhost:8080` in your browser
8. Click the **Start demo** button
9. Open **Developer Tools** and monitor the console logs

## Interactive verification with `tlsn-js` {#interactive-demo}

![](../../diagrams/light/overview_prover_verifier.svg#gh-light-mode-only)
![](../../diagrams/dark/overview_prover_verifier.svg#gh-dark-mode-only)

Follow the instructions from:
https://github.com/tlsnotary/tlsn-js/blob/main/demo/interactive-demo/README.md

## Web-to-web proofs with `tlsn-js` {#web-to-web-p2p}

This demo showcases peer-to-peer communication between a web prover and a web verifier using TLSNotary. The prover fetches data from swapi.dev and proves it to the verifier.

Follow the instructions from:
https://github.com/tlsnotary/tlsn-js/blob/main/demo/web-to-web-p2p/README.md

## Run a local notary server and websocket proxy (Optional) {#local}

The instructions above, use the [PSE](https://pse.dev) hosted notary server and websocket proxy. This is easier for this quick start because it requires less setup. If you develop your own applications with `tlsn-js`, development will be easier with locally hosted services. This section explains how.

### Websocket Proxy {#proxy}

Since a web browser doesn't have the ability to make TCP connection, we need to use a websocket proxy server.

1. Install [wstcp](https://github.com/sile/wstcp):
```shell
cargo install wstcp
```
2. Run a websocket proxy for `https://swapi.dev`:
```shell
wstcp --bind-addr 127.0.0.1:55688 swapi.dev:443
```

Note the `swapi.dev:443` argument on the last line, this is the server we will use in this quick start.

### Run a Local Notary Server {#local-notary}

For this demo, we also need to run a local notary server.

1. Clone the TLSNotary repository  (defaults to the `main` branch, which points to the latest release):
   ```sh
   git clone https://github.com/tlsnotary/tlsn.git
   ```
2. Run the notary server:
   ```sh
   cargo run --release --bin notary-server
   ```

The notary server will now be running in the background waiting for connections.
