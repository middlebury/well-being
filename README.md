# Middlebury Well-Being


## Requirements
- Node.js v4.5+
- [HarpJS](http://harpjs.com/) `npm install -g harp`

If you're on Node 6.4, you'll have to install pre release version of 0.21 [issue with v6.4](https://github.com/sintaxi/harp/issues/564)
```
npm i -g sintaxi/harp#v0.21.0-pre
```

## Getting started

Install dependencies (currently just browser-sync)
```
npm install
```

Run the Harp server with Browser sync
```bash
npm run dev
```

## Build for production

```
harp compile
```

## Deploying

TODO

[See Harp docs for more](https://harpjs.com/docs/)
