---
id: payid-cli
title: PayID CLI
sidebar_label: PayID CLI
---

With the PayID CLI, you can run PayID commands from the command line, and access all PayID features.

View the [PayID CLI project on Github](https://github.com/payid-org/payid-cli).

## PayID CLI setup

PayID CLI uses TypeScript. Therefore, make sure you have installed [node](https://nodejs.org/en/download/) and the [npm](https://docs.npmjs.com/downloading-and-installing-packages-locally) package manager locally.

To install PayID CLI, run:

`npm install -g @payid-org/payid-cli`

This command installs PayID CLI as a global npm module and links it as a payid executable, typically under
`/usr/local/bin/payid`.

To install and run PayID CLI from Docker, run:

`docker run xpring/payid-cli`

## Run PayID CLI in interactive or single-command mode

To run PayID CLI in interactive mode, run `payid` to open an interactive session.

In interactive mode, you can then run PayID CLI commands as desired with the form
`<command> <arguments>`, such as:

`load 'nhartner$ripplex.money'`

To exit interactive mode, run `exit`.

To run PayID CLI in single-command mode, prefix each command with `payid`. Each command takes the form

`payid <command> <arguments>`, such as:

`payid load 'nhartner$ripplex.money'`

Use single-command mode for scripts, or to chain the results of multiple commands together, such as:

`payid init 'my$pay.id' && payid crypto-address add btc mainnet notARealAddress && payid save`

When you pass a PayID as an argument in non-interactive mode, make sure to escape or quote the PayID to avoid the `'$'` being interpolated as a variable by the shell.

## Example commands

**Tip**: If you obtain an XRP testnet wallet, you get a PayID based on your RippleX account that is already linked to an XRP address. This is useful for testing. Visit the [RippleX.io portal](https://RippleX.io/portal) and sign in with Github. The RippleX portal launchpad page opens. Click **XRP Testnet Wallet** and follow the steps to create your wallet. Your PayID has the form `<github-username>$ripplex.money` and you can use this PayID value in these example commands.

### Load a PayID

This command loads the specified PayID from a remote server.

`load loisrp$ripplex.money`

The output fetches all the PayID address mappings for the given PayID from the remote server and displays the resulting JSON. In this example, the PayID has two crypto-addresses attached to it.

```json
{
  "payId": "loisrp$ripplex.money",
  "version": "1.0",
  "addresses": [
    {
      "paymentNetwork": "XRPL",
      "environment": "TESTNET",
      "addressDetailsType": "CryptoAddressDetails",
      "addressDetails": {
        "address": "rwcBVJwXdXusY5SgNMjHbMWbR2Nnt2U3R6"
      }
    },
    {
      "paymentNetwork": "INTERLEDGER",
      "environment": "TESTNET",
      "addressDetailsType": "CryptoAddressDetails",
      "addressDetails": {
        "address": "$ripplex.money/LoisRP"
      }
    }
  ],
  "verifiedAddresses": []
}
```

### Remove a crypto-address

If you have previously loaded a PayID, you can use this command to remove a crypto-address attached to it.

`crypto-address remove "rwcBVJwXdXusY5SgNMjHbMWbR2Nnt2U3R6"`

The output returns the updated information about the PayID. In this example, the command removed the address on XRP testnet.

```json
{
  "payId": "loisrp$ripplex.money",
  "version": "1.0",
  "addresses": [
    {
      "paymentNetwork": "INTERLEDGER",
      "environment": "TESTNET",
      "addressDetailsType": "CryptoAddressDetails",
      "addressDetails": {
        "address": "$ripplex.money/LoisRP"
      }
    }
  ],
  "verifiedAddresses": []
}
```

### Add a crypto-address

You can add a crypto-address to a PayID. This command does not confirm the validity of the address details.

`crypto-address add xrpl mainnet rP3t3JStqWPYd8H88WfBYh3v84qqYzbHQ6 12345`

The output returns the updated information for the PayID, including the added crypto-address.

```json
{
  "payId": "loisrp$ripplex.money",
  "addresses": [
    {
      "paymentNetwork": "INTERLEDGER",
      "environment": "TESTNET",
      "addressDetailsType": "CryptoAddressDetails",
      "addressDetails": {
        "address": "$ripplex.money/LoisRP"
      }
    },
    {
      "paymentNetwork": "XRPL",
      "environment": "MAINNET",
      "addressDetailsType": "CryptoAddressDetails",
      "addressDetails": {
        "address": "rP3t3JStqWPYd8H88WfBYh3v84qqYzbHQ6",
        "tag": 12345
      }
    }
  ],
  "verifiedAddresses": []
}
```

### Create a new PayID

The following set of commands demonstrates how to create a new PayID, attach multiple address mappings, and save the result to a JSON file.

```
init cleopatra$example.com
crypto-address add xrpl mainnet rP3t3JStqWPYd8H88WfBYh3v84qqYzbHQ6 12345
crypto-address add btc mainnet 3M2CH71P6uZTra1PsjiEhNFB7kCENShCgt
save
```

The PayID JSON representation specified here is saved to the local filesystem as example.json.

### Manage identity keys

The PayID protocol supports signing address mappings using one or more cryptographic keys. PayID CLI provides several commands to generate and load keys. Once a key is generated or loaded by PayID CLI, it is retained in PayID CLI's local storage for use when you sign your PayID.

You can generate multiple identity keys by using the `keys generate` and `keys load` commands.

To remove all loaded keys from the CLI's local storage, use the `keys clear` command. To see all keys currently loaded into PayID CLI, use the `keys list` command.

#### Generate a new key run

```
keys generate
```

This generates a new key and saves it to a file named identity-key.pem. To load a previously created identity key, run
`keys load </path/to/pem/file>`.

#### Sign a PayID

Before you sign an PayID, you must either load the PayID using the `load` command, or create a PayID using the `init` command, and you must execute commands to add one or more crypto-addresses to the PayID.

Once a PayID has been initialized or loaded, you can sign it using an identity key. You must either generate a new key, or load an existing one. Once your PayID has been loaded or initialized, and your identity key has been generated or loaded, you can sign the PayID using the `sign` command. The `sign` command signs each of your PayID address mappings using the loaded identity keys, and outputs the resulting PayID with a `verifiedAddress` field. Run the `save` command to save your PayID, with signed addresses, to file.

#### Inspect a Verified PayID

Two commands are available to verify a PayID's verified addresses.

`verify` - Checks if all the verified addresses have valid signatures.

`inspect` - Displays details information about each verified address and signatures.

#### Create, sign, and verify a PayID

With this combination of commands, you can create a PayID, add an address mapping, generate an identity key, sign your PayID address mapping, and then inspect the final result. You can check the output after each command.

```
init alexanderthegreat$example.com
crypto-address add xrpl mainnet rP3t3JStqWPYd8H88WfBYh3v84qqYzbHQ6
keys generate
sign
inspect
```
