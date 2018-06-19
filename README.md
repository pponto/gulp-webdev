# Gulp WebDev

A simple environment to watch and compile your website project with Sass, PostCSS, Babel, Image Compress (JPG and PNG) and Autoprefixer.

## Requeriments

You need [npm](https://www.npmjs.com/get-npm) and [nodejs](https://nodejs.org/en/) working to use this project.

## Installation

You can download a zip file or clone the repository:

```sh
$ git clone https://github.com/pponto/gulp-webdev
$ cd gulp-webdev
$ npm install
```
And `npm install` to install all dependencies.

## Usage

This page aplication only requires two commands to work. `gulp` command its the default procedured. `dist` for compressed final files.

### Folder structure

All website project need to stay inside `/src` folder. All images at `/src/img`, all Javascript files at `/src/js`, and `/src/sass` for scss files.

```
project
│   README.md
│   gulpfile.js
│   package.json
│   LICENSE.md    
│
└───src
│   │   index.html
│   │   ...
│   │
│   └───img
│   │   │   img01.jpg
│   │   │   img02.png
│   │   │   ...
│   │   
│   └───js
│   │   │   jquery.js
│   │   │   main.js
│   │   │   ...
│   │   
│   └───sass
│       │   normalize.scss
│       │   style.scss
│       │   ...
│   
└───dist
    │   compiled files by gulp
    └───compiled folders by gulp
```

The folder structure can be modified at anytime by changing the names or anything you want in the gulpfile.js file. 

### gulp command

`gulp` command will compile all files on the `/src` folder to another folder, called `/dist`. After the command, Gulp will monitor the files automatically with the `watch` function, always recompiling the files after any saved changes.

```sh
$ gulp
```

### dist command

`gulp dist`* will compile all files, as well all images in the `/img` will be compressed, which are only copied with the `gulp` default command.

```sh
$ gulp dist
```

*This function does not have `watch` mode.

### Configuration

PostCSS [Autoprefixer](https://github.com/postcss/autoprefixer)
PostCSS [Easing Gradient](https://github.com/larsenwork/postcss-easing-gradients)
PostCSS [Font Magician](https://github.com/jonathantneal/postcss-font-magician)
PostCSS [Responsive Type](https://github.com/seaneking/postcss-responsive-type)
Gulp [Sass](https://www.npmjs.com/package/gulp-sass)
Gulp [Babel](https://www.npmjs.com/package/gulp-babel)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details