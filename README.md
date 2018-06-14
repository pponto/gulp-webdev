# Gulp WebDev

A simple environment to watch and compile with Sass, PostCSS, Babel, Image Compress (JPG and PNG) and Autoprefixer.

## Installation

You can download a zip file or clone the repository:

```sh
$ git clone https://github.com/pponto/gulp-webdev
```
And `npm install` to install all dependencies:

```sh
$ npm install
```

## How to use

### gulp command:

The default `gulp`:

```sh
$ gulp
```

Gulp command Will compile all files on the `/src` folder to another folder, called `/dist`. After the command, Gulp will monitor the files automatically with the `watch` function, always recompiling the files after any saved changes.

### dist command

`gulp dist` Will compile all files, as well all  images in the `/img` folder, which are only copied with the default command.

```sh
$ gulp dist
```

This function does not have `watch` mode.

## Configuration

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details