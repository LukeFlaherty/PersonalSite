# lukejf.com

## Build Process

- Clone or download the repo (or use codespaces if you're a power user)
- `npm i` to install dependencies
- `npm run dev` to start the local development server

## Contribution Process

- Should use node version ~ 16
- `nvm install 16.9.1` THAN `nvm use 16.9.1`
- Install NVM with Homebrew: [HERE](https://tecadmin.net/install-nvm-macos-with-homebrew/)
- Install NVM with Github: [HERE](https://github.com/nvm-sh/nvm)
- NVM Documentation for Commands: [HERE](https://github.com/nvm-sh/nvm)

```
if(Luke){
  commitDirectlyToMain(whatever_you_added);
}
```

```
if(!Luke){
  String name_of_branch = "feature/NAME/description"
  cutFeatureBranch(name_of_branch);
  createPR(git_add, git_commit, git_push_to_feature_branch);
}
```

## Deployment

- After you push it will auto build and deploy
- Check on build process at this link: [HERE](https://app.netlify.com/sites/vibrant-snyder-08322b/deploys)
