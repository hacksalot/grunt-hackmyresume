# grunt-hackmyresume

> Grunt plugin for [HackMyResume](https://github.com/hacksalot/HackMyResume).

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-hackmyresume --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-hackmyresume');
```

## The "hackmyresume" task

### Overview
In your project's Gruntfile, add a section named `hackmyresume` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({

  // Run HackMyResume!
  hackmyresume: {
    options: {
      theme: 'compact'
    },
    main: {
      src: 'path/to/resume.json',
      dest: 'path/to/generated/resume.all'
    }
  }

});
```


### Options

The full HackMyResume options model is supported. A few of the more commonly
used options are:

#### options.theme
Type: `String`
Default value: `'modern'`

A string describing the resume theme to use. Can be either:

- The name of a predefined FRESH theme (`modern`, `compact`, `positive`,
  `awesome`, or `basis`)
- The path to a locally-installed theme (for ex,
  `node_modules/jsonresume-theme-classy`)

#### options.css
Type: `String`
Default value: `'embed'`

Whether CSS files should be linked (`link`) or embedded (`embed`) via `<link>`
or `<style>` tags, respectively.

#### options.pdf
Type: `String`
Default value: `'wkhtmltopdf'`

The name of the underlying PDF generation engine to use for the PDF version of
the resume (if any). Can be either `wkhtmltopdf` or `phantom`.

#### options.silent
Type: `Boolean`
Default value: `false`

Disable HackMyResume output.

### Usage Examples

#### Default Options
In this example, the default options are used to generate a single resume to all
available formats using the default 'modern' theme:

```js
grunt.initConfig({
  hackmyresume: {
    options: { }, // No options? No problem.
    main: {
      files: {
        // Will create dest/resume.html, dest/resume.pdf, dest/resume.md, etc.
        'dest/resume.all': ['src/resume.json'],
      }
    }
  },
});
```

#### Custom Options
In this example, custom options are used to change the resume theme and the
method of CSS embedding.

```js
grunt.initConfig({
  hackmyresume: {
    options: {
      theme: 'compact', // Set the 'compact' theme
      css: 'link'       // Use <link> for theme CSS files (HTML formats only)
    },
    main: {
      files: {
        'dest/resume.all': ['src/resume.json'],
      }
    }
  },
});
```

You can also specify the source and destination files this way:

```js
grunt.initConfig({
  hackmyresume: {
    options: {
      theme: 'compact',
      css: 'link'      
    },
    main: { // Using .src and .dest instead of files hash
      src: 'src/resume.json',
      dest: 'dest/resume.all'      
    }
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
