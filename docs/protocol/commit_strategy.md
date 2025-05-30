---
sidebar_position: 3
---
# Commit Strategy
When the `Prover` generates authenticated commitments to the plaintext of the transcript, it is possible to choose which range(s) of the plaintext to commit to. This dictates the range(s) that can be selectively disclosed later to the application-specific `Verifier`. This section discusses different commit strategies, as well as their associated costs.

## Strategy
Depending on the application, different commit strategies can be chosen. One can commit to everything at once, to each byte individually, or any selection of ranges. There is no significant computational impact when you choose a large number of commitments, but there is a linear storage cost increase.

TLSNotary offers a default strategy that commits to ranges corresponding with HTTP objects. This results in a good balance between *selective disclosure flexibility* and *storage size* for most use cases.

The table below provides an overview of the different commit strategies:

| Strategy                  | Description                                                                                                                                                             | Selective Disclosure                                                                                      | Cost                                       | Usage                                                                                                                                                                                                           |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Commit to custom range(s) | Only commit to the range(s) that need to be selectively disclosed later                                                                                                 | Only the committed ranges can be revealed. Subranges or other ranges cannot be revealed                   | Smallest artefact size                     | Suitable when only a single (or a few) selective disclosure pattern is required and size is important                                                                                                           |
| Commit to HTTP objects    | Commit to ranges that correspond to all common HTTP objects in both request and response, e.g., every header's key and value, every key and value in JSON response body | Flexible to selectively reveal different HTTP objects in different presentations of the transcript        | Larger artefact size than strategy #1      | Suitable for most use cases — the default strategy used in the repository's [example](https://github.com/tlsnotary/tlsn/blob/4d5102b6e141ecb84b8a835604be1d285ae6eaa5/crates/examples/attestation/prove.rs#L99) |
| Commit to each byte       | One commit for each byte, resulting in the maximum number of commitments                                                                                                | Maximum flexibility as any range of the transcript can be selectively disclosed in multiple presentations | Largest artefact size among all strategies | Suitable when needed to support selective disclosure on many arbitrary ranges beyond common HTTP objects                                                                                                        |

## Cost
The commitment strategies differ mainly in the number of committed ranges (`K`). As `K` increases, the primary cost is the size of the generated artefact. The table below details the artefacts and how their sizes scale with `K`.

| Artefact      | Description                                                                                       | Size Scaling | Explanation                                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `Attestation` | Artifact signed by the `Notary` attesting to the authenticity of the plaintext from a TLS session | Constant     | `Attestation` only contains data that remains constant-sized regardless of `K`, e.g., the Merkle root of the commitments |
| `Secret`      | Artifact containing secret data that correspond to commitments in `Attestation`                   | Linear       | `Secret` contains some data whose sizes scale linearly with `K`, e.g., a Merkle tree whose number of leaves equals `K`   |

Using the default hash algorithm (i.e., BLAKE3), every additional range committed costs around 250 bytes of increment in the size of `Secret`. For more details, please visit this [Jupyter notebook](https://github.com/tlsnotary/landing-page/blob/master/docs/protocol/commit_strategy.ipynb).
