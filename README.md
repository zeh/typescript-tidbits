# TypeScript tidbits

Collection of all the standard generic code I typically use in project, in TypeScript format.

It includes a gulp task to build it as ES5 JavaScript, and the JS output.


## Building

To build, use the default gulp.

1. Install dependencies

   npm install

2. Build once (from /ts to /js)

   gulp [build]

3. Watch for modifications, and build when needed

   gulp watch

4. Minify (from /js to /js-min)

   gulp minify