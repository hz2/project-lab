[![pipeline status](https://gitlab.com/lzz/react-sync/badges/master/pipeline.svg)](https://gitlab.com/lzz/react-sync/commits/master) | [![coverage report](https://gitlab.com/lzz/react-sync/badges/master/coverage.svg)](https://gitlab.com/lzz/react-sync/commits/master)

⚠️⚠️⚠️

Do **NOT** contribute to this repo on github

⚠️⚠️⚠️

## Build

```bash
cd build/
cat ~/dockerioToken | docker login --username hzsq --password-stdin
v=`date +'%F-%H-%M'`
docker build -t lab:v${v} .
docker tag lab:v${v} hzsq/lab:v${v}
docker push hzsq/lab:v${v}
```
## Deploy to

| platform | link | status |
| ------ | ------ | ------ |
| vercel | [https://lab.not.wiki](https://lab.not.wiki) | ![Website](https://img.shields.io/website?url=https%3A%2F%2Flab.not.wiki) |
| gitlab page | [https://lab.huxi.pub](https://lab.huxi.pub) | ![Website](https://img.shields.io/website?url=https%3A%2F%2Flab.huxi.pub) |

## Flow chart

<img src="./flow.svg" alt="flow" width="85%" loading="lazy">

## Logo

<img src="./LabRectangle2.svg" alt="logo" width="200px" loading="lazy">

## Element 

+ Mountain: peaks, courage
+ Water: waves, flow
+ Green: nature, hope
+ White: air, freedom