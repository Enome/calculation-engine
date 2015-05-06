require('babel/register');

import R from 'ramda';
import yaml from 'js-yaml';
import fs from 'fs';
import Engine from './calculation-engine';

var s = fs.readFileSync('input.yaml', 'utf8');
var o = yaml.safeLoad(s);

var inputs = R.map((key) => {

  return {
    name: key,
    value: o.inputs[key]
  };

}, R.keys(o.inputs));


var formulas = R.map((key) => {

  return {
    name: key,
    formula: o.formulas[key]
  };

}, R.keys(o.formulas));

var configuration = R.concat(inputs, formulas);
var engine = Engine(configuration);

R.forEach((result) => {
  console.log(`${result} = ${engine.get(result)}`);
}, o.results);
