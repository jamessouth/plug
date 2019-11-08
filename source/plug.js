class HelloWorldPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('MyPlugin', (compilation, callback) => {


      console.log();
      console.log(Object.keys(compilation.assets));




      // compilation.assets.forEach((item) => {
      //
      //
      //   console.log();
      //   console.log();
      //   console.log();
      //   console.dir(item);
      //   console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
      // });




      // compilation.chunks.forEach(chunk => {
      //   chunk.files
      //     // .filter(filename => /\.css$/.test(filename))
      //     .forEach(filename => {
      //       // var source = compilation.assets[filename].source();
      //       console.log();
      //       console.log();
      //       console.log(filename, '--------------------');
      //       // console.log(source);
      //
      //       // console.dir(compilation.assets[filename].keys());
      //
      //
      //     });
      // });

      callback();
    });
  }
}

module.exports = HelloWorldPlugin;
