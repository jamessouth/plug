// import { describe } from 'riteway';// , Try
// import webpack from 'webpack';

const webpack = require('webpack');
// const HelloWorldPlugin = require('./source/plug');
const wpCfg = require('../webpack.config');
// const { describe } = require('riteway');
// const webpack = require('webpack');


// describe('cutOutTable cuts rows out of the body of a table', async assert => {
//   assert({
//     given: 'a table as a string',
//     should: 'remove table and tbody tags, leaving the rows',
//     actual: cutOutTable(mockTable),
//     expected: mockCutTable
//   });
// });





webpack(wpCfg, (err, stats) => {
  if (err) {
    throw err;
  }
  if (stats.hasErrors()) {
    throw new Error(
      stats.toString({
        errorDetails: true,
      })
    );
  }
  if(stats.hasWarnings()) {
    console.warn(stats.toJson().warnings);
  }

  console.log(
    stats.toString({
      chunks: false,
      chunkModules: false,
      modules: false,
    })
  );


});
